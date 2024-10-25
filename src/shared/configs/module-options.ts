import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

import configuration from './configuration';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
  load: [configuration],
  validationSchema: Joi.object({
    UV_ENV: Joi.string()
      .valid('development', 'production')
      .default('development'),
    UV_PORT: Joi.number().default(8888),
    UV_HOST: Joi.string().required(),
  }),
};
