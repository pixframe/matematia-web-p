export default class CustomError extends Error {
  code = "";

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}
