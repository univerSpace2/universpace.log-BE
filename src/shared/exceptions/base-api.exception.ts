import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseApiException extends HttpException {
  public details: string | Record<string, any> | undefined;

  constructor(
    message: string,
    statusCode: HttpStatus,
    details?: string | Record<string, any> | undefined,
  ) {
    super(message, statusCode);
    this.name = BaseApiException.name;
    this.details = details;
  }
}
