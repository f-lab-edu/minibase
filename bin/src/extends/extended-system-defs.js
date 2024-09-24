"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedSystemDefs = void 0;
const system_defs_1 = require("../core/system-defs");
const minibase_system_catalogs_1 = require("./minibase-system-catalogs");
class ExtendedSystemDefs extends system_defs_1.SystemDefs {
    constructor(args) {
        super(args);
        this.SYSTEM_CATALOGS = new minibase_system_catalogs_1.MinibaseSystemCatalogs();
    }
    get systemCatalogs() {
        return this.SYSTEM_CATALOGS;
    }
}
exports.ExtendedSystemDefs = ExtendedSystemDefs;
