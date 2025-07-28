import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const createdUser = new this.userModel(registerDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec(); // exclude password
  }

  async deleteUser(id: string): Promise<void> {
    const res = await this.userModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException('User not found');
    }
  }
}
