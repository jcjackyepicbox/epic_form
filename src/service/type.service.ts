export interface IService<T> {
  status: boolean;
  data: T;
  message?: string;
}
