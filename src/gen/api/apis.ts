export * from './accountingApi';
import { AccountingApi } from './accountingApi';
export * from './assetApi';
import { AssetApi } from './assetApi';
export * from './projectApi';
import { ProjectApi } from './projectApi';
export const APIS = [AccountingApi, AssetApi, ProjectApi];
