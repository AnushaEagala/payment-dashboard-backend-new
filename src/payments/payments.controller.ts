import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  @Roles('admin', 'viewer')
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: string,
  ) {
    const filter = status ? { status } : {};
    return this.paymentsService.findAll(filter, Number(page), Number(limit));
  }

  @Get('stats')
  @Roles('admin')
  async getStats() {
    return this.paymentsService.getStats();
  }

  @Get(':id')
  @Roles('admin', 'viewer')
  async findById(@Param('id') id: string) {
    return this.paymentsService.findById(id);
  }

  @Post()
  @Roles('admin')
  async create(@Body() body: { amount: number; method: string; description?: string }) {
    // Simulate payment creation, status defaults to 'completed'
    return this.paymentsService.create({
      amount: body.amount,
      method: body.method,
      description: body.description,
      status: 'completed',
    });
  }
}
