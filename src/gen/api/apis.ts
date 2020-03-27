export * from './accountingApi';
export * from './assetApi';
export * from './projectApi';
import { AccountingApi } from './accountingApi';
import { AssetApi } from './assetApi';
import { ProjectApi } from './projectApi';
export const APIS = [AccountingApi, AssetApi, ProjectApi];