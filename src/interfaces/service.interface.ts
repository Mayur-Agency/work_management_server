export interface ICreateAssembly {
  workerId: string;
  rawMaterialsArr: Array<{ id: string; quantity: number }>;
}

export interface FindWorkerByIdArgs {
  workerId: string;
  includeAssembly?: boolean;
  completed?: boolean;
}