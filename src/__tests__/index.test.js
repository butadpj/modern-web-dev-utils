import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  getPageNamesIn,
  createPageTemplates,
  getScriptFoldersIn,
  htmlWebpackPluginTemplates,
  getPageTemplatesWithChunk,
  getPageTemplatesChunkEntryPoints,
} from '../index';

describe('Test utility functions', () => {
  test('getPageNamesIn() should get all HTML file names in a given directory', () => {
    const expectedResult = ['about', 'index', 'no-chunk', 'project-bracketour'];

    expect(getPageNamesIn('./src/__tests__/pages')).toEqual(expectedResult);
  });

  test('getScriptFoldersIn() should get all script folders in a given directory', () => {
    const expectedResult = ['about', 'index', 'project-bracketour'];

    expect(getScriptFoldersIn('./src/__tests__/scripts')).toEqual(
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
      {
        name: 'project-bracketour.html',
        chunk: 'project-bracketour',
      },
    ];

    expect(
      createPageTemplates(
        getPageNamesIn('./src/__tests__/pages'),
        getScriptFoldersIn('./src/__tests__/scripts'),
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
      new HtmlWebpackPlugin({
        filename: 'project-bracketour.html',
        template: `./pages/project-bracketour.html`,
        chunks: ['project-bracketour'],
      }),
    ];

    const pluginTemplates = htmlWebpackPluginTemplates(
      createPageTemplates(
        getPageNamesIn('./src/__tests__/pages'),
        getScriptFoldersIn('./src/__tests__/scripts'),
      ),
    );

    expect(pluginTemplates).toEqual(expectedResult);
  });

  test('getPageTemplatesWithChunk() - Return all page templates with chunks', () => {
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
        name: 'project-bracketour.html',
        chunk: 'project-bracketour',
      },
    ];

    expect(
      getPageTemplatesWithChunk(
        './src/__tests__/pages',
        './src/__tests__/scripts',
      ),
    ).toEqual(expectedResult);
  });

  test('getPageTemplatesChunkEntryPoints() should return the webpack entry points for page templates with chunk', () => {
    const expectedResult = {
      about: './scripts/about/main.js',
      index: './scripts/index/main.js',
      'project-bracketour': './scripts/project-bracketour/main.js',
    };

    expect(
      getPageTemplatesChunkEntryPoints(
        getPageTemplatesWithChunk(
          './src/__tests__/pages',
          './src/__tests__/scripts',
        ),
        './scripts',
      ),
    ).toEqual(expectedResult);
  });
});
