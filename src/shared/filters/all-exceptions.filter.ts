import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UVLogger } from '../logger/logger.service';
import { createRequestContext } from '../request-context/util';
import { Request, Response } from 'express';
import { BaseApiException } from '../exceptions/base-api.exception';

const REQUEST_ID_TOKEN_HEADER = 'x-request-id';

@Catch() // 모든 예외를 처리하는 필터
export class AllExceptionsFilter<T> implements ExceptionFilter {
  constructor(
    private config: ConfigService, // 설정 서비스 주입
    private readonly logger: UVLogger, // 로거 주입
  ) {
    this.logger.setContext(AllExceptionsFilter.name); // 로거 컨텍스트 설정
  }

  catch(exception: T, host: ArgumentsHost) {
    // 예외를 처리하는 메서드
    const ctx = host.switchToHttp(); // HTTP 컨텍스트로 전환
    const req: Request = ctx.getRequest<Request>(); // 요청 객체 가져오기
    const res: Response = ctx.getResponse<Response>(); // 응답 객체 가져오기

    const path = req.url; // 요청 경로
    const timestamp = new Date().toISOString(); // 타임스탬프
    const requestId = req.headers[REQUEST_ID_TOKEN_HEADER]; // 요청 ID
    const requestContext = createRequestContext(req); // 요청 컨텍스트 생성

    let stack: any; // 스택 트레이스
    let statusCode: HttpStatus | undefined = undefined; // 상태 코드
    let errorName: string | undefined = undefined; // 오류 이름
    let message: string | undefined = undefined; // 오류 메시지
    let details: string | Record<string, any> | undefined = undefined; // 오류 세부사항

    // BaseApiException 인스턴스인 경우
    if (exception instanceof BaseApiException) {
      statusCode = exception.getStatus(); // 상태 코드 가져오기
      errorName = exception.constructor.name; // 오류 이름 가져오기
      message = exception.message; // 메시지 가져오기
      details = exception.details || exception.getResponse(); // 세부사항 가져오기
    } else if (exception instanceof HttpException) {
      // HttpException 인스턴스인 경우
      statusCode = exception.getStatus();
      errorName = exception.constructor.name;
      message = exception.message;
      details = exception.getResponse();
    } else if (exception instanceof Error) {
      // 일반 오류인 경우
      errorName = exception.constructor.name;
      message = exception.message;
      stack = exception.stack; // 스택 트레이스 저장
    }

    // 위의 카테고리에 맞지 않는 경우 내부 서버 오류로 설정
    statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR; // 상태 코드 설정
    errorName = errorName || 'InternalException'; // 오류 이름 설정
    message = message || 'Internal server error'; // 메시지 설정

    // 참고용: https://cloud.google.com/apis/design/errors
    const error = {
      statusCode,
      message,
      errorName,
      details,
      // 우리가 추가한 메타 정보
      path,
      requestId,
      timestamp,
    };
    this.logger.warn(requestContext, error.message, {
      // 경고 로그 기록
      error,
      stack,
    });

    const isProMood = this.config.get<string>('env') !== 'development'; // 프로덕션 모드 확인
    if (isProMood && statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      error.message = 'Internal server error'; // 프로덕션 모드에서 메시지 설정
    }

    res.status(statusCode).json({ error }); // 응답 전송
  }
}
