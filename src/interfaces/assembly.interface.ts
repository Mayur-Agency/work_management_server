export interface ICreateAssembly {
  workerId: string;
  rawMaterialsArr: Array<{ id: string; quantity: number }>;
}
