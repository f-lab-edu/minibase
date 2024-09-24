### Minibase project

## 1. Minibase CLI

The text-based interface to Minibase can be invoked by using the command minibase, which has the following command-line options:

-d database name (required)
-s size of the DB in pages
-b size of the buffer pool in pages
-r reopen mode; used to reopen an existing database

example:

```
npm start -- -d test_db -s 100 -b 100 -r
```
