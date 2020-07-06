export default class AppError {
  public status: number;

  public message: string;

  constructor(message: string, status = 400) {
    this.status = status;
    this.message = message;
  }
}
