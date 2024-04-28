import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';


export const createEmptyModel = (fileName: string, language = 'javascript') => {
  return monaco.editor.createModel("", language, monaco.Uri.parse(fileName))
}

export const createModel = (content: string, fileName: string, language = 'javascript') => {
  return monaco.editor.createModel(content, language, monaco.Uri.parse(fileName))

}