import { ExtendedSystemDefs } from './extends/extended-system-defs'

interface IMainArgs {
  dbName: string
  dbSize: number
  bufferPoolSize: number
  reopenMode: boolean
}

export async function main(args: IMainArgs) {
  let minibaseGlobals = new ExtendedSystemDefs(args)
  let systemCatalogs = minibaseGlobals.systemCatalogs

  console.log(minibaseGlobals)
  console.log(systemCatalogs)
}
