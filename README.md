# knex-pg-copy-streams

Extends Knex query builder with `copyTo` and `copyFrom` methods correspoding to PostgreSQL `COPY TO` and `COPY FROM` statements.

It's possible to select data using built-in Knex [streams](https://knexjs.org/guide/interfaces.html#streams), but not to insert data ([see issue #576](https://github.com/knex/knex/issues/756)).

Based on [pg-copy-streams](https://github.com/brianc/node-pg-copy-streams).

```sh
npm install yoursdearboy/knex-pg-copy-streams
```

```js
const fs = require("fs");
const knex = require("knex");
const knexPgCopyStreams = require("knex-pg-copy-streams");

knexPgCopyStreams.extend(knex);

const sql  = "COPY table FROM STDIN DELIMITER ';' CSV HEADER;"
const file = fs.createReadStream("table.csv");
knex.copyFrom(sql, file);

knex.copyTo("COPY table TO STDOUT", process.stdout);
```

