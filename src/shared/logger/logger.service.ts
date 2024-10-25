import { Injectable, Scope } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import * as chalk from 'chalk';
import { RequestContext } from '../request-context/request-context.dto';

@Injectable({ scope: Scope.TRANSIENT })
export class UVLogger {
  private context?: string;
  private logger: Logger;

  public setContext(context: string): void {
    this.context = context;
  }
  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          ({ timestamp, level, message, contextName, ctx, ...meta }) => {
            const levelColor = {
              error: chalk.red,
              warn: chalk.yellow,
              info: chalk.green,
              debug: chalk.blue,
              verbose: chalk.cyan,
            };
            const coloredLevel = levelColor[level]
              ? levelColor[level](level.toUpperCase())
              : level.toUpperCase();
            const formattedMessage = message.replace(/\n/g, '\n    ');
            const metaString = Object.keys(meta).length
              ? '\n' + JSON.stringify(meta, null, 2)
              : '';

            return `${chalk.gray(timestamp)} ${coloredLevel} ${chalk.yellow(`[${contextName || 'Global'}]`)} ${formattedMessage}${
              ctx ? ` ${chalk.magenta(`requestId=${ctx.requestId}`)}` : ''
            }${metaString}`;
          },
        ),
      ),
      transports: [new transports.Console()],
    });
  }

  error(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.error({
      message,
      contextName: this.context,
      ctx,
      timestamp,
      ...meta,
    });
  }

  warn(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.warn({
      message,
      contextName: this.context,
      ctx,
      timestamp,
      ...meta,
    });
  }

  debug(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.debug({
      message,
      contextName: this.context,
      ctx,
      timestamp,
      ...meta,
    });
  }

  verbose(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.verbose({
      message,
      contextName: this.context,
      ctx,
      timestamp,
      ...meta,
    });
  }

  log(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.info({
      message,
      contextName: this.context,
      ctx,
      timestamp,
      ...meta,
    });
  }
}
