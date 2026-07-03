import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @ManyToOne(() => OrderEntity, (order) => order.items, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'orderId' })
    order: OrderEntity;

    @Column()
    productId: number;

    @Column()
    productName: string;

    @Column('decimal', { precision: 10, scale: 2 })
    unitPrice: number;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    subtotal: number;
}
