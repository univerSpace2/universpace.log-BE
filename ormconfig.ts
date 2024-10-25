import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const typeOrmConfig = new DataSource({
  type: 'sqlite', // 데이터베이스 타입을 'sqlite'로 설정
  database: 'database.sqlite', // 사용할 SQLite 데이터베이스 파일 이름
  synchronize: false, // 데이터베이스와 엔티티 간의 동기화 여부
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // 엔티티 파일 경로
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
});
export default typeOrmConfig;
