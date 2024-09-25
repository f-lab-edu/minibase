import { BufferManager } from './buffer-manager'
import { DiskSpaceManager } from './disk-space-manager'

export interface ISystemDefsInitArgs {
  dbName: string
}

export class SystemDefs {
  protected readonly mDBName: string // MINIBASE_DBNAME
  protected readonly mBufferManager: BufferManager // MINIBASE_BM
  protected readonly mDiskSpaceManager: DiskSpaceManager // MINIBASE_DB

  constructor(args: ISystemDefsInitArgs) {
    this.mDBName = args.dbName
    this.mBufferManager = new BufferManager()
    this.mDiskSpaceManager = new DiskSpaceManager()
  }
}
