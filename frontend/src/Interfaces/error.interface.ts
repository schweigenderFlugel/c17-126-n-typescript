export interface ServerErrorResponse {
  status: number;
  error: {
    message: string;
    details: string;
  }
}