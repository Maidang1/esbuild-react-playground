<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue';
import { tryOnMounted } from '@vueuse/core';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import FileSelected from '../components/FileSelected.vue';
import { useFileStore } from '../store/file';

const input = ref<HTMLDivElement | null>(null);
const readonlyRef = ref<HTMLDivElement | null>(null);
let editorRef: monaco.editor.IStandaloneCodeEditor | null = null;
let editorReadOnlyRef: monaco.editor.IStandaloneCodeEditor | null = null;

const fileStore = useFileStore();

const emit = defineEmits(['change']);

tryOnMounted(() => {
  if (editorRef) return;
  const content = fileStore.filesMap.get(fileStore.currentFile);

  const editor = monaco.editor.create(input.value!, {
    language: 'javascript',
    theme: 'vs-light',
    value: content || '',
  });

  const editorReadOnly = monaco.editor.create(readonlyRef.value!, {
    language: 'javascript',
    theme: 'vs-light',
    value: content,
    readOnly: true,
  });

  editorRef = editor;
  editorReadOnlyRef = editorReadOnly;
  (window as any).editorRef = editor;

  editorRef.getModel()?.onDidChangeContent(() => {
    const value = editorRef?.getValue();
    editorReadOnlyRef?.setValue(value || '');
    fileStore.filesMap.set(fileStore.currentFile, value || '');
    emit('change');
  });

  watch(
    () => fileStore.currentFile,
    () => {
      console.log('currentFile', fileStore.currentFile);
      const content = fileStore.filesMap.get(fileStore.currentFile);
      editorRef?.setValue(content || '');
      editorReadOnlyRef?.setValue(content || '');
    }
  );
});

onUnmounted(() => {
  if (editorRef) {
    editorRef.dispose();
  }
});
</script>

<template>
  <div class="flex items-center h-full">
    <div class="h-full flex-1">
      <FileSelected />
      <div ref="input" class="editor-container h-full flex-1"></div>
    </div>
    <div ref="readonlyRef" class="h-full flex-1"></div>
  </div>
</template>
