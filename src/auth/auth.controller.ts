import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
   const { email, password } = body;
   return this.authService.login(email, password);
}

  @Post('register')
  async register(@Body() body: LoginDto) {
    console.log('Registering user:', body);
    return this.authService.register(body);
  }
}
