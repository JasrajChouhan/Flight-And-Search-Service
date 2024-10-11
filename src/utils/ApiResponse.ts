export class ApiResponse {
  message: string;
  statusCode: number;
  data?: object;
  success: boolean;

  constructor(message: string = 'Success', statusCode: number, data = {}) {
    this.message = message;
    (this.statusCode = statusCode), (this.data = data);
    this.success = statusCode < 400;
  }
}
