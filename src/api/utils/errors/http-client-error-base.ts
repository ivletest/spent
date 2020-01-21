export abstract class HTTPClientError extends Error {
    public readonly name!: string;
    public readonly statusCode!: number;

    constructor(message: object | string) {
      if (message instanceof Object) {
        super(JSON.stringify(message));
      } else {
        super(message);
      }
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
