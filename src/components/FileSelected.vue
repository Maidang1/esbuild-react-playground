<template>
  <div
    class="flex items-center justify-between mx-2 text-[#888] file-selector mb-4"
  >
    <ul
      class="list-none flex max-w-full overflow-auto box-border bg-white items-center"
    >
      <li v-for="[fileName] in fileStore.filesMap">
        <span
          @click="handleClick(fileName)"
          class="file mr-4"
          :class="{ active: fileStore.currentFile === fileName }"
          v-show="fileName !== 'importMap'"
          >{{ fileName }}</span
        >
      </li>
      <li class="file">
        <span class="file-add" @click="handleAddFile">+</span>
      </li>
    </ul>
    <div>
      <div>
        <span
          @click="handleClick('importMap')"
          class="file mr-4"
          :class="{ active: fileStore.currentFile === 'importMap' }"
          >Import Map</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFileStore } from '../store/file';
const fileStore = useFileStore();
const handleClick = (fileName: string) => {
  console.log('fileName', fileName);
  fileStore.currentFile = fileName;
};

const handleAddFile = () => {
  const componentName = `Comp${fileStore.filesMap.size}`;
  fileStore.filesMap.set(componentName, '');
};
</script>

<style scoped>
.file-selector {
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  height: 38px;
}
.file {
  position: relative;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
}
.file.active {
  color: #42b883;
  border-bottom: 3px solid #42b883;
  cursor: text;
}
.file-add::hover {
  color: #42b883;
}
</style>
