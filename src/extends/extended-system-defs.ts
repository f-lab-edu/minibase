import { SystemDefs, SystemDefsInitArgs } from "../core/system-defs"
import { MinibaseSystemCatalogs } from "./minibase-system-catalogs"
import { II_SystemCatalogs } from "./system-catalogs.abstract"

export class ExtendedSystemDefs extends SystemDefs {
  private SYSTEM_CATALOGS: II_SystemCatalogs
  constructor(args: SystemDefsInitArgs) {
    super(args)
    this.SYSTEM_CATALOGS = new MinibaseSystemCatalogs()
  }

  get systemCatalogs() {
    return this.SYSTEM_CATALOGS
  }
}
