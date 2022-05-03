# modern-web-dev-utils

Utility functions for [create-modern-web-dev](https://www.npmjs.com/package/create-modern-web-dev)

- **getPageNamesIn(directory)** - Get all HTML file names in a given directory

  ```js
  getPageNamesIn('./pages'); // [('index', 'with-script', 'without-script')];
  ```

- **getScriptFoldersIn(directory)** - Get all script folders (should have main.js file inside) in a given directory

  ```js
  getScriptFoldersIn('./script'); //['index', 'with-scrpit'];
  ```

- **createPageTemplates(pageNames, scriptFolders)** - Create page templates for each pages with or without script

  ```js
  createPageTemplates(
    getPageNamesIn('./pages'),
    getScriptFoldersIn('./script')
  );

  // if the page has corresponding script (with chunk)
  {
    name: 'with-chunk.html',
    chunk: 'with-chunk',
  }

  // if the page has no corresponding script (without chunk)
  {
    name: 'without-chunk.html',
  }
  ```

- **htmlWebpackPluginTemplates(pageTemplates)** - Generate HTML files (with HtmlWebpackPlugin) for each page template

  ```js
  htmlWebpackPluginTemplates(
    createPageTemplates(
      getPageNamesIn('./pages'),
      getScriptFoldersIn('./script'),
    ),
  );

  // Array of HtmlWebpackPlugin instance
  [
    new HtmlWebpackPlugin({
      filename: 'with-chunk.html',
      template: `./pages/with-chunk.html`,
      chunks: ['with-chunk'],
    }),
    new HtmlWebpackPlugin({
      filename: 'without-chunk.html',
      template: `./pages/without-chunk.html`,
    }),
  ];
  ```

- **getPageTemplatesWithChunk(pagesDirectory, scriptDirectory)** - Return all page templates with chunks

  ```js
  getPageTemplatesWithChunk('./pages', './script');

  // Array of page templates with chunk
  [
    {
      name: 'index.html',
      chunk: 'index',
    },
    {
      name: 'with-chunk.html',
      chunk: 'with-chunk',
    },
  ];
  ```

- **getPageTemplatesChunkEntryPoints(pageTemplatesWithChunk, scriptDirectory)** - Return the webpack entry points for page templates with chunk

  ```js
  getPageTemplatesChunkEntryPoints(
    getPageTemplatesWithChunk('./pages', './script'),
    './script',
  );

  // Entry points to pages with chunks
  {
    index: './script/index/main.js',
    'with-chunk': './script/with-chunk/main.js',
  };
  ```
