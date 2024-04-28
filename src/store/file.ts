import { defineStore } from "pinia"
import {
  ref
} from "vue"


export const useFileStore = defineStore('file', () => {
  const currentFile = ref('index.tsx')
  const currentContent = ref(`
const Count = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
const container = document.getElementById('root');
console.log("container", container)
ReactDOM.render(<Count />,document.getElementById('root'));
  `)

  const importMapContent = `
{
  "imports": {
    "react": "https://unpkg.com/react@16.7.0/umd/react.production.min.js",
    "react-dom": "https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js"
  }
}`.trim()
  const filesMap = new Map<string, string>();
  filesMap.set(currentFile.value, currentContent.value)
  filesMap.set("test.tsx", "console.log('test')");
  filesMap.set("importMap", importMapContent);
  return {
    filesMap,
    currentFile,
  }
})