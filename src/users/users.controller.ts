import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../common/entities/user.entity';
import { Roles } from '../common/decorators/permission.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.SUPER_ADMIN)
  @Post()
  async create(
    @Body() dto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userService.create(dto);
    return this.userService.toPublicUser(user);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get()
  async findAll(): Promise<Omit<UserEntity, 'password'>[]> {
    const users = await this.userService.findAll();
    return users.map((u) => this.userService.toPublicUser(u));
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      return null;
    }
    return this.userService.toPublicUser(user);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userService.update(id, dto);
    return this.userService.toPublicUser(user);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
