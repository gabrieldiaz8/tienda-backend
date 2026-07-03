import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from '../common/entities/order.entity';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/permission.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Public()
  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<OrderEntity> {
    return await this.ordersService.create(dto);
  }

  @Roles(UserRole.OWNER, UserRole.SUPER_ADMIN)
  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  @Roles(UserRole.OWNER, UserRole.SUPER_ADMIN)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<OrderEntity> {
    return await this.ordersService.findById(id);
  }
}