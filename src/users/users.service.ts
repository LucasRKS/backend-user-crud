import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { hashPassword } from 'src/utils/hashPassword';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDTO.email },
      });

      if (existingUser)
        throw new ConflictException(
          `User with email ${createUserDTO.email} already exists.`,
        );

      const user = this.userRepository.create({
        ...createUserDTO,
        password: await hashPassword(createUserDTO.password),
      });

      const cacheKey = `user:${user.id}`;

      await this.cacheManager.set(cacheKey, JSON.stringify(user), 3600);

      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error on creating user: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        `Error on finding users: ${error.message}`,
      );
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const cacheKey = `user:${id}`;
      const cachedUser = await this.cacheManager.get(cacheKey);

      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) throw new NotFoundException(`User with id ${id} not found.`);

      await this.cacheManager.set(cacheKey, JSON.stringify(user), 3600);

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        `Error finding user: ${error.message}`,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user)
        throw new NotFoundException(`User with email ${email} not found.`);

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        `Error finding user: ${error.message}`,
      );
    }
  }

  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    try {
      const user = await this.findById(id);

      if (updateUserDTO.password)
        updateUserDTO.password = await hashPassword(updateUserDTO.password);

      const updatedUser = this.userRepository.merge(user, updateUserDTO);

      return await this.userRepository.save(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        `Error updating user: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.findById(id);

      await this.userRepository.remove(user);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        `Error removing user: ${error.message}`,
      );
    }
  }
}
