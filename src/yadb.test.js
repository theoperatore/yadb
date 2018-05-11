const path = require('path');
const Yadb = require('./yadb');

const mockDirPath = path.resolve(process.cwd(), 'testDatabase');
const mockFilename = '0-mockfilename.json';
const mockFile = { hello: 'world' };
const mockFilesList = ['0-file.json', '1-file.json', '2-file.json'];
const mockFile1 = { hello: 'world1' };
const mockFile2 = { hello: 'world2' };
const mockFiles = {
  [path.resolve(mockDirPath, mockFilename)]: mockFile,
  [path.resolve(mockDirPath, '1-file.json')]: mockFile1,
  [path.resolve(mockDirPath, '2-file.json')]: mockFile2,
}

jest.mock('fs-extra', () => Object.assign(
  {},
  require.requireActual('fs-extra'),
  {
    pathExistsSync: path => path === mockDirPath,
    readJson: filename => {
      if (filename in mockFiles) {
        return Promise.resolve(mockFiles[filename])
      }
      Promise.reject(`Mock file not found in mock list: ${filename}`);
    },
    readdir: (dir, cb) => cb(null, mockFilesList),
  },
));

test('exports a class constructor', () => {
  expect(typeof Yadb).toBe('function');
});

test('throws when givin a directory that does not exist', () => {
  const notRealPath = 'blah-blah';
  expect(() => new Yadb(notRealPath)).toThrow(`No directory found at path: ${notRealPath}`);
});

test.skip('can create a json file', () => {
  const db = new Yadb(mockDirPath);
  return expect(db.create(mockFilename, mockFile)).resolves.toEqual(true);
});

test('can read a json file', () => {
  const db = new Yadb(mockDirPath);
  return expect(db.read(mockFilename)).resolves.toEqual(mockFile);
});

test('can read a range of json files', () => {
  const db = new Yadb(mockDirPath);
  const limit = 5;
  const offset = 1;

  return expect(db.readRange(limit, offset)).resolves.toEqual([mockFile1, mockFile2]);
});
