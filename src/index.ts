import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { PageTemplatesInterface } from './interface';

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
