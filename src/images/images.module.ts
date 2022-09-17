import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [TypeOrmModule.forFeature([Image])],
})
export class ImagesModule {}
