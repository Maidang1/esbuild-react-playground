<script setup lang="ts">
import { useEsbuild } from './hooks/useEsbuild';
import PlaygroundHeader from './components/PlaygroundHeader.vue';
const { isInitialized, esbuild } = useEsbuild();

const handleClick = async () => {
  const code = `const a = 'hello world';console.log(a);`;
  const result = await esbuild.transform(code, {
    format: 'iife',
  });
  console.log('result', result.code);
};
</script>

<template>
  <div class="prose">
    <div v-if="!isInitialized">loading esbuild resource</div>
    <div v-else>
      <playground-header />
      <div @click="handleClick">click me1</div>
    </div>
  </div>
</template>
