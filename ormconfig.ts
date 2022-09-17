import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 4012,
  username: 'root',
  password: 'amBc7juC',
  database: 'test',
  entities: ['src/**/entities/**/*{.js,.ts}'],
  migrations: ['src/migrations/*{.js,.ts}'],
  
});

export default dataSource;