import { BufferManager } from "./buffer-manager"
import { DiskSpaceManager } from "./disk-space-manager"

export interface SystemDefsInitArgs {
  dbName: string
}

export class SystemDefs {
  protected MINIBASE_DBNAME: string
  protected MINIBASE_BM: BufferManager
  protected MINIBASE_DB: DiskSpaceManager

  constructor(args: SystemDefsInitArgs) {
    this.MINIBASE_DBNAME = args.dbName
    this.MINIBASE_BM = new BufferManager()
    this.MINIBASE_DB = new DiskSpaceManager()
  }
}
