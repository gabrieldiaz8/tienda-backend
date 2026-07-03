import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OrderEntity } from '../common/entities/order.entity';
import { OrderItemEntity } from '../common/entities/order-item.entity';
import { ProductEntity } from '../common/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    return await this.dataSource.transaction(async (manager) => {
      const items: OrderItemEntity[] = [];
      let total = 0;

      for (const itemDto of dto.items) {
        const product = await manager.findOne(ProductEntity, {
          where: { id: itemDto.productId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!product) {
          throw new NotFoundException(
            `Producto con id ${itemDto.productId} no encontrado`,
          );
        }

        if (product.stock < itemDto.quantity) {
          throw new BadRequestException(
            `Stock insuficiente para "${product.name}". Disponible: ${product.stock}, solicitado: ${itemDto.quantity}`,
          );
        }

        product.stock -= itemDto.quantity;
        await manager.save(product);

        const subtotal = Number(product.price) * itemDto.quantity;
        total += subtotal;

        const orderItem = manager.create(OrderItemEntity, {
          productId: product.id,
          productName: product.name,
          unitPrice: product.price,
          quantity: itemDto.quantity,
          subtotal,
        });
        items.push(orderItem);
      }

      const order = manager.create(OrderEntity, {
        items,
        paymentMethod: dto.paymentMethod,
        total,
        customerName: dto.customerName ?? null,
        customerPhone: dto.customerPhone ?? null,
      });

      const savedOrder = await manager.save(order);

      savedOrder.code = `ADR-${String(savedOrder.id).padStart(4, '0')}`;
      await manager.save(savedOrder);

      return manager.findOne(OrderEntity, {
        where: { id: savedOrder.id },
        relations: ['items'],
      });
    });
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }
    return order;
  }
}