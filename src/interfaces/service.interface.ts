export interface ICreateAssembly {
  workerId: string;
  rawMaterialsArr: Array<{ id: string; quantity: number }>;
}

export interface FindWorkerByIdArgs {
  workerId: string;
  includeAssembly?: boolean;
  completed?: boolean;
}

export interface AssemblyQueryParams {
  dateAssigned?: Date;
  dateCompleted?: Date;
  completed?: boolean;
  workerId?: string;
  rawMaterial?: string;
}
