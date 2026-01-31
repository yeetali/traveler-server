import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { AuthorInterceptor } from 'src/users/interceptors/author.interceptor';
import { QueryTripDto } from './dto/query-trip.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AuthorGuard } from 'src/trips/guards/author.guard';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';
import { UpdateExpenseDto } from 'src/expenses/dto/update-expense.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @UseInterceptors(AuthorInterceptor)
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @IsPublic()
  findAll(@Query() query: QueryTripDto) {
    return this.tripsService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tripsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthorGuard)
  update(@Param('id') id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  @UseGuards(AuthorGuard)
  remove(@Param('id') id: number) {
    return this.tripsService.remove(id);
  }

  @Post(':id/expenses')
  @UseGuards(AuthorGuard)
  addExpenseToTrip(
    @Param('id') id: number,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.tripsService.addExpenseToTrip(id, createExpenseDto);
  }

  @Patch(':id/expenses/:expenseId')
  @UseGuards(AuthorGuard)
  updateExpense(
    @Param('id') _: number,
    @Param('expenseId') expenseId: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.tripsService.updateExpense(expenseId, updateExpenseDto);
  }

  @Delete(':id/expenses/:expenseId')
  @UseGuards(AuthorGuard)
  deleteExpense(@Param('id') _: number, @Param('expenseId') expenseId: number) {
    return this.tripsService.deleteExpense(expenseId);
  }
}
