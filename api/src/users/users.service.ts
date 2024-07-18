import {
  ConflictException,
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...dto,
    };

    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    const data: Prisma.UserUpdateInput = {
      ...dto,
    };

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return updatedUser;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
