export type ICreateAssembly = {
  workerId: string;
  rawMaterialsArr: Array<{ id: string; quantity: number }>;
};

export interface AssemblyQueryParams {
  dateAssigned?: Date;
  dateCompleted?: Date;
  completed?: boolean;
  workerId?: string;
  rawMaterial?: string;
}