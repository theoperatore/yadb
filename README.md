# Ya-DB

Yet Another (nodejs, filesystem-based) Database

## Rationale

Do you ever have data for a database sitting in json files, where the filename is a key into the file? Have you ever thought to yourself, oh man this would be a lot easier if I just did a javascript string comparison operation to filter this list of stuff?

Well I did, and other database solutions are large for this use case (and some don't even support offsets and limits, leveldb...).

Here is my solution then, a database that reads your json files from a folder and caches them via memoization on filenames while also providing some basic offset and limit functionality.

Good enough for testing and good enough for hacking. 🚀

## Installation

```bash
yarn add ya-db
```

## Usage

```javascript
const path = require('path');
const Yadb = require('ya-db');
const pathToDatabaseDir = path.resolve(process.cwd(), 'dataDir');

// create an instance
const db = new Yadb(pathToDatabaseDir);

// create a new file;
// Returns a promise that resolves to true or false
// depending on if the write was successful
const data = { hello: 'world' };
const isCreated = await db.write('0-myFile.json', data);

// get that file back as a parsed javascript object
const file = await db.read('0-myFile.json');

// starting with the 5th file (filesystem sort order), grab the next 10 files.
const limit = 10;
const offset = 5;
const files = await db.readRange(limit, offset);

// delete a file
const isDeleted = await db.delete('0-myFile.json');
```

## Limitations

This is not recursive! There can be **zero** directories in the folder used for saving the files. `Ya-db` will throw when trying to read a file that is a directory.

The database will only be as fast as the filesystem can read and write.

## License

MIT
