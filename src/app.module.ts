import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Image } from './images/entities/image.entity';
import { ImagesModule } from './images/images.module';
import { DataSource } from 'typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 4012,
      username: 'root',
      password: 'amBc7juC',
      database: 'test',
      entities: [User, Image],
      synchronize: false,
      // autoLoadEntities: true,
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: "custom_migration_table",

    }),
    UsersModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
