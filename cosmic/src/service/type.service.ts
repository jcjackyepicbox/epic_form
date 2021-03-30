export interface IService<T> {
  data: T;
  status: boolean;
  error?: string;
  code?: number;
}

export interface IPostStatus {
  status: boolean;
  message: string;
}
