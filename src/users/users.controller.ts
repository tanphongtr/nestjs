import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiCreatedResponse, ApiProperty, ApiSecurity } from '@nestjs/swagger';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    const { firstName, lastName } = createUserDto;
    return this.usersService.create({ firstName, lastName });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor) // use serializer
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException();
    }
    return new UserEntity(user); // use serializer
    // return this.usersService.findOne(+id);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
