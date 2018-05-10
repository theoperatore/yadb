# Yadb

Yet Another (nodejs, filesystem-based) Database

## Rationale

Do you ever have data for a database sitting in json files, where the filename is a key into the file? Have you ever thought to yourself, oh man this would be a lot easier if I just did a javascript string comparison operation to filter this list of stuff?

Well I did, and other database solutions are large for this use case (and some don't even support offsets and limits, leveldb...).

Here is my solution then, a database that reads your json files from a folder and caches them via memoization on filenames.

Good enough for testing and good enough for hacking. 🚀

## License

MIT
