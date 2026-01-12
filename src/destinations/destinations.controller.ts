import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { QueryDestinationDto } from './dto/query-destination.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('media'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateDestinationDto })
  create(
    @Body() createDestinationDto: CreateDestinationDto,
    @UploadedFile() media: Express.Multer.File,
  ) {
    return this.destinationsService.create({
      ...createDestinationDto,
      media: media ? `uploads/destinations/${media.filename}` : null,
    });
  }

  @Get()
  @IsPublic()
  findAll(@Query() queryDestinationDto: QueryDestinationDto) {
    return this.destinationsService.find(queryDestinationDto);
  }
}
