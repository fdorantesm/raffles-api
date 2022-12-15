import { registerAs } from '@nestjs/config';
import { HttpServerConfiguration } from '@thp/common';
import { EnvironmentConfig } from '@thp/common/types/environment/environment.type';

export const environmentConfigLoader = registerAs(
  'environment',
  (): EnvironmentConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
  }),
);
