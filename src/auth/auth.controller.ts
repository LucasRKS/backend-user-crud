import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login.' })
  @ApiResponse({
    status: 201,
    description: 'Sucessfully logged in.',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiBody({ type: LoginDTO })
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.authService.validateUser(
      loginDTO.email,
      loginDTO.password,
    );

    return this.authService.login(user);
  }
}
