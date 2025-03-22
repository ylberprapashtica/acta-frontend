import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'acta_user',
  password: process.env.POSTGRES_PASSWORD || 'acta_password',
  database: process.env.POSTGRES_DB || 'acta_db',
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
})); 