import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Creates a new user.' })
  @ApiResponse({ status: 201, description: 'User created.' })
  async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.userService.create(createUserDTO);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Lists all users.' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List a user.' })
  async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Edit a user.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Removes a user.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }
}
