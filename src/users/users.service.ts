import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../common/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const exists = await this.userRepository.findOne({
      where: { usuario: dto.usuario },
    });
    if (exists) {
      throw new BadRequestException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByUsuario(usuario: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { usuario } });
  }

  async validatePassword(
    usuario: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.findUserByUsuario(usuario);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  toPublicUser(user: UserEntity): Omit<UserEntity, 'password'> {
    const { password: _, ...publicUser } = user;
    void _;
    return publicUser;
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, SALT_ROUNDS);
    }

    await this.userRepository.update(id, dto);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.userRepository.delete(id);
  }
}
