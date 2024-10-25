import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UVLogger } from '../logger/logger.service';
import { createRequestContext } from '../request-context/util';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: UVLogger) {
    this.logger.setContext(LoggingInterceptor.name); // 로거의 컨텍스트를 설정
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest(); // HTTP 요청 객체 가져오기
    const method = request.method; // 요청 메서드 저장
    const ctx = createRequestContext(request); // 요청 컨텍스트 생성

    const now = Date.now(); // 현재 시간 저장
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse(); // HTTP 응답 객체 가져오기
        const statusCode = response.statusCode; // 응답 상태 코드 저장

        const responseTime = Date.now() - now; // 응답 시간 계산

        const resData = { method, statusCode, responseTime }; // 응답 데이터 객체 생성

        this.logger.log(ctx, 'Request completed', { resData }); // 요청 완료 로그 기록
      }),
    );
  }
}
