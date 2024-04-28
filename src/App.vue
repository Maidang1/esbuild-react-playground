<script setup lang="ts">
import { useEsbuild } from './hooks/useEsbuild';
import PlaygroundHeader from './components/PlaygroundHeader.vue';
import PlaygroundEditor from './components/PlaygroundEditor.vue';
import { useFileStore } from './store/file';
import { debounce } from 'lodash-es';
import { buildImportMap, buildHtml } from './utils/html';
import { ref } from 'vue';
const { isInitialized, esbuild } = useEsbuild();
const html = ref('');

const fileStore = useFileStore();

const handleChange = debounce(async () => {
  console.log('change');
  const fileName = fileStore.currentFile;

  const content = fileStore.filesMap.get(fileName);

  const result = await esbuild.transform(content!, {
    jsx: 'transform',
    format: 'esm',
    loader: 'tsx',
    target: 'es2022',
  });
  const imports = buildImportMap(fileStore.filesMap.get('importMap')!);
  html.value = buildHtml(result.code, imports);
});
</script>

<template>
  <div class="h-full w-full">
    <div v-if="!isInitialized">loading esbuild resource</div>
    <div v-else class="h-full">
      <playground-header />
      <playground-editor @change="handleChange" />

      <div class="h-full">
        <iframe :srcdoc="html" class="h-full w-full"></iframe>
      </div>
    </div>
  </div>
</template>
