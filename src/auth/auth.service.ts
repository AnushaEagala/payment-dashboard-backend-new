import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate credentials
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const userObj = (user as HydratedDocument<User>).toObject();
      const { password, ...result } = userObj;
      return result;
    }
    return null;
  }

  // Login route
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    // Fallback hardcoded user (optional)
    if (!user && email === 'admin@example.com' && password === 'admin123') {
      return {
        access_token: this.jwtService.sign({ email }),
        user: { email, role: 'admin' },
      };
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: (user as any)._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { email: user.email },
    };
  }

  // Register new user
  async register(userDto: any): Promise<User> {
    const existingUser = await this.usersService.findByEmail(userDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    return this.usersService.createUser({ ...userDto, password: hashedPassword });
  }
}
