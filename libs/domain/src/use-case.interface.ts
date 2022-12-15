export interface UseCase {
  exec(...params: any[]): Promise<any>;
}
