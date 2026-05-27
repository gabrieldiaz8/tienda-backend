import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { ProductEntity } from '../common/entities/product.entity';
import { UserRole } from '../common/enums/user-role.enum';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  // Registrar al dueño (único usuario administrador)
  async registerOwner(name: string, surname: string, usuario: string, password: string): Promise<UserEntity> {
    const exists = await this.userRepository.findOne({ where: { usuario } });
    if (exists) {
      throw new BadRequestException('El usuario ya existe');
    }

    const owner = this.userRepository.create({
      name,
      surname,
      usuario,
      password,
      role: UserRole.OWNER,
    });

    return await this.userRepository.save(owner);
  }

  // Login del dueño
  async login(usuario: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { usuario } });
    if (!user || user.password !== password) {
      throw new BadRequestException('Credenciales inválidas');
    }
    return user;
  }

  // Crear producto (solo OWNER)
  async createProduct(ownerId: number, dto: CreateProductDto): Promise<ProductEntity> {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner || owner.role !== UserRole.OWNER) {
      throw new BadRequestException('No autorizado');
    }
    const product = this.productRepository.create({
      ...dto,
      createdByUserId: owner.id,
    });
    return await this.productRepository.save(product);
  }

  // Actualizar producto
  async updateProduct(ownerId: number, productId: number, dto: UpdateProductDto): Promise<ProductEntity> {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner || owner.role !== UserRole.OWNER) {
      throw new BadRequestException('No autorizado');
    }
    await this.productRepository.update(productId, dto);
    const updated = await this.productRepository.findOne({ where: { id: productId } });
    if (!updated) throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    return updated;
  }

  // Eliminar producto
  async deleteProduct(ownerId: number, productId: number): Promise<void> {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner || owner.role !== UserRole.OWNER) {
      throw new BadRequestException('No autorizado');
    }
    await this.productRepository.delete(productId);
  }
}
