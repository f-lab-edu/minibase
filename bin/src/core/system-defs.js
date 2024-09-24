"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemDefs = void 0;
const buffer_manager_1 = require("./buffer-manager");
const disk_space_manager_1 = require("./disk-space-manager");
class SystemDefs {
    constructor(args) {
        this.MINIBASE_DBNAME = args.dbName;
        this.MINIBASE_BM = new buffer_manager_1.BufferManager();
        this.MINIBASE_DB = new disk_space_manager_1.DiskSpaceManager();
    }
}
exports.SystemDefs = SystemDefs;
