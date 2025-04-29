import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid email or password.');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password.');

    const { password: _password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validatePayload(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
