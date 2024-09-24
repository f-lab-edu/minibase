import { argv } from "process"
import { main } from "./src/main"

const D_FLAG = argv.indexOf("-d") // db name (required)
const S_FLAG = argv.indexOf("-s") // size of the DB in pages
const B_FLAG = argv.indexOf("-b") // size of buffer pool in pages
const R_FLAG = argv.indexOf("-r") // reopen mode
if (D_FLAG === -1) throw new Error("No such flag: -d")

const DATABASE_NAME = argv[D_FLAG + 1]
const DB_SIZE = S_FLAG === -1 ? 16384 : parseInt(argv[S_FLAG + 1]) // 16384 pages
const BUFFER_POOL_SIZE = B_FLAG === -1 ? 16384 : parseInt(argv[B_FLAG + 1]) // 16384 pages
const REOPEN_MODE = R_FLAG === -1 ? false : true
if (!DATABASE_NAME) throw new Error("No database name provided")
if (DB_SIZE < 1) throw new Error("Invalid DB size or buffer pool size")
if (BUFFER_POOL_SIZE < 1) throw new Error("Invalid DB size or buffer pool size")

main({
  dbName: DATABASE_NAME,
  dbSize: DB_SIZE,
  bufferPoolSize: BUFFER_POOL_SIZE,
  reopenMode: REOPEN_MODE
})
