import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { QueryTripDto } from './dto/query-trip.dto';
import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class TripsService extends AbstractService<QueryTripDto, Trip> {
  constructor(
    @InjectRepository(Trip) private readonly tripsRepository: Repository<Trip>,
  ) {
    super(tripsRepository);
  }

  async create(createTripDto: CreateTripDto) {
    try {
      const trip = this.tripsRepository.create(createTripDto);
      return await this.tripsRepository.save(trip);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number) {
    const trip = await this.tripsRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const updateTrip = await this.tripsRepository.update(id, updateTripDto);
    return updateTrip;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}
