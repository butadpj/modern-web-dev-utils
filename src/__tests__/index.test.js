import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  getPageNamesIn,
  createPageTemplates,
  getScriptFoldersIn,
  htmlWebpackPluginTemplates,
} from '../index';

describe('Test utility functions', () => {
  test('getPageNamesIn() should get all HTML file names in a given directory', () => {
    const expectedResult = ['about', 'index', 'no-chunk'];

    expect(getPageNamesIn('./src/__tests__/pages')).toEqual(expectedResult);
  });

  test('getScriptFoldersIn() should get all script folders in a given directory', () => {
    const expectedResult = ['about', 'index', 'no-corresponding-page'];

    expect(getScriptFoldersIn('./src/__tests__/script')).toEqual(
      expectedResult,
    );
  });

  test('createPageTemplates() should create a page templates for pages with or without chunks', () => {
    const expectedResult = [
      {
        name: 'about.html',
        chunk: 'about',
      },
      {
        name: 'index.html',
        chunk: 'index',
      },
      {
        name: 'no-chunk.html',
      },
    ];

    expect(
      createPageTemplates(
        getPageNamesIn('./src/__tests__/pages'),
        getScriptFoldersIn('./src/__tests__/script'),
      ),
    ).toEqual(expectedResult);
  });

  test('htmlWebpackPluginTemplates() should generate HTML files (with HtmlWebpackPlugin) for each page template', () => {
    const expectedResult = [
      new HtmlWebpackPlugin({
        filename: 'about.html',
        template: `./pages/about.html`,
        chunks: ['about'],
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `./pages/index.html`,
        chunks: ['index'],
      }),
      new HtmlWebpackPlugin({
        filename: 'no-chunk.html',
        template: `./pages/no-chunk.html`,
      }),
    ];

    const pluginTemplates = htmlWebpackPluginTemplates(
      createPageTemplates(
        getPageNamesIn('./src/__tests__/pages'),
        getScriptFoldersIn('./src/__tests__/script'),
      ),
    );

    expect(pluginTemplates).toEqual(expectedResult);
  });
});
