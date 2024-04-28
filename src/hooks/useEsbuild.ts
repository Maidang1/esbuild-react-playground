import { tryOnMounted } from "@vueuse/core"
import * as esbuild from 'esbuild-wasm';

import { ref } from "vue"

export const useEsbuild = () => {

  const isInitialized = ref(false);
  const esbuildRef = ref(esbuild)

  tryOnMounted(async () => {
    if (isInitialized.value) return;
    await esbuild.initialize({
      wasmURL: 'esbuild.wasm',
    });
    isInitialized.value = true;
  })

  return {
    isInitialized,
    esbuild: esbuildRef.value,
  }
}