import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Destination]),
    MulterModule.register({
      dest: './public/uploads/destinations',
      // LOCAL STORAGE
      // storage: diskStorage({
      //   destination: './public/uploads/destinations',
      //   filename: (_, file, cb) => {
      //     const uniqueSuffix =
      //       Date.now() + '-' + Math.round(Math.random() * 1e9);
      //     cb(null, file.fieldname + '-' + uniqueSuffix);
      //   },
      // }),
      // MEMORY STORAGE
      storage: memoryStorage(),
    }),
  ],
  controllers: [DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}
