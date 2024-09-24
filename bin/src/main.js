"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const extended_system_defs_1 = require("./extends/extended-system-defs");
function main(args) {
    return __awaiter(this, void 0, void 0, function* () {
        let minibaseGlobals = new extended_system_defs_1.ExtendedSystemDefs(args);
        let systemCatalogs = minibaseGlobals.systemCatalogs;
        console.log(minibaseGlobals);
        console.log(systemCatalogs);
    });
}
