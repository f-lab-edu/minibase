import { SystemDefs, ISystemDefsInitArgs } from '../core/system-defs'
import { MinibaseSystemCatalogs } from './minibase-system-catalogs'
import { II_SystemCatalogs } from './system-catalogs.abstract'

export class ExtendedSystemDefs extends SystemDefs {
  private readonly mSystemCatalogs: II_SystemCatalogs
  constructor(args: ISystemDefsInitArgs) {
    super(args)
    this.mSystemCatalogs = new MinibaseSystemCatalogs()
  }

  get systemCatalogs() {
    return this.mSystemCatalogs
  }
}
