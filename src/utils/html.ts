
export const buildImportMap = (imports: string) => `<script type="importmap">${imports}</script>`

export const buildHtml = (scripts: string, imports: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
  </head>
  <script src="react.js" crossorigin></script>
  <script src="react-dom.js" crossorigin></script>
  ${imports}
  <body>
    <div id="root"></div>
    <script type="module">${scripts}</script>
  </body>
</html>
`