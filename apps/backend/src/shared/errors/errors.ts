import AppError from './app-error';

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}
export class InvalidParameterError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
