import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { AbstractService } from 'src/common/abstract.service';
import { Destination } from './entities/destination.entity';
import { QueryDestinationDto } from './dto/query-destination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DestinationsService extends AbstractService<
  QueryDestinationDto,
  Destination
> {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
  ) {
    super(destinationRepository);
  }

  async create(createDestinationDto: CreateDestinationDto) {
    try {
      const destination =
        this.destinationRepository.create(createDestinationDto);
      return await this.destinationRepository.save(destination);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} destination`;
  }

  update(id: number, updateDestinationDto: UpdateDestinationDto) {
    return `This action updates a #${id} destination`;
  }

  remove(id: number) {
    return `This action removes a #${id} destination`;
  }
}
