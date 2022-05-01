import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import {
  PageTemplatesChunkInterface,
  PageTemplatesInterface,
} from './interface';

export const getPageNamesIn = (directory = './pages'): Array<string> =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(
      (item: any) =>
        !item.isDirectory() && path.parse(item.name).ext === '.html',
    )
    .map(({ name }) => path.parse(name).name);

export const getScriptFoldersIn = (directory = './script'): Array<string> =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((item: any) => item.isDirectory())
    .map((item: any) => item.name);

export const createPageTemplates = (
  pageNames: Array<string>,
  scriptFolders: Array<string>,
): Array<PageTemplatesInterface> => {
  return pageNames.map((name, index) => {
    if (name === scriptFolders[index]) {
      return {
        name: `${name}.html`,
        chunk: name,
      };
    }
    return {
      name: `${name}.html`,
    };
  });
};

export const htmlWebpackPluginTemplates = (
  pageTemplates: Array<PageTemplatesInterface>,
): Array<HtmlWebpackPlugin> =>
  pageTemplates.map(({ name, chunk }) => {
    if (chunk)
      return new HtmlWebpackPlugin({
        filename: name,
        template: `./pages/${name}`,
        chunks: [chunk],
      });

    return new HtmlWebpackPlugin({
      filename: name,
      template: `./pages/${name}`,
    });
  });

export const getPagesTemplateWithChunk = (
  pagesDirectory = './pages',
  scriptDirectory = './script',
): Array<PageTemplatesInterface> => {
  return createPageTemplates(
    getPageNamesIn(pagesDirectory),
    getScriptFoldersIn(scriptDirectory),
  )
    .filter((pageTemplate) => pageTemplate.chunk)
    .map((pageTemplate) => pageTemplate);
};

export const getPageTemplatesChunkEntryPoints = (
  pagesTemplateWithChunk: Array<PageTemplatesInterface>,
  scriptDirectory = './script',
): PageTemplatesChunkInterface => {
  return pagesTemplateWithChunk.reduce(
    (entryPoints, item) => ({
      ...entryPoints,
      [item.chunk]: `${scriptDirectory}/${item.chunk}/main.js`,
    }),
    {},
  );
};
