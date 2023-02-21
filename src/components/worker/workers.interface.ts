export interface CreateWorkerDto {
  name: string;
  phone: string;
  address: string;
}

export interface UpdateWorkerDto {
  id: string;
  name?: string;
  phone?: string;
  address?: string;
}

export interface FindWorkerByIdArgs {
  workerId: string;
  includeAssembly?: boolean;
  completed?: boolean;
}
