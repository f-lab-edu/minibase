"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const main_1 = require("./src/main");
const D_FLAG = process_1.argv.indexOf("-d"); // db name (required)
const S_FLAG = process_1.argv.indexOf("-s"); // size of the DB in pages
const B_FLAG = process_1.argv.indexOf("-b"); // size of buffer pool in pages
const R_FLAG = process_1.argv.indexOf("-r"); // reopen mode
if (D_FLAG === -1)
    throw new Error("No such flag: -d");
const DATABASE_NAME = process_1.argv[D_FLAG + 1];
const DB_SIZE = S_FLAG === -1 ? 16384 : parseInt(process_1.argv[S_FLAG + 1]); // 16384 pages
const BUFFER_POOL_SIZE = B_FLAG === -1 ? 16384 : parseInt(process_1.argv[B_FLAG + 1]); // 16384 pages
const REOPEN_MODE = R_FLAG === -1 ? false : true;
if (!DATABASE_NAME)
    throw new Error("No database name provided");
if (DB_SIZE < 1)
    throw new Error("Invalid DB size or buffer pool size");
if (BUFFER_POOL_SIZE < 1)
    throw new Error("Invalid DB size or buffer pool size");
(0, main_1.main)({
    dbName: DATABASE_NAME,
    dbSize: DB_SIZE,
    bufferPoolSize: BUFFER_POOL_SIZE,
    reopenMode: REOPEN_MODE
});
