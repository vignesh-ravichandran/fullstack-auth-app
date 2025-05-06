import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../models/user.model';
import { IUserRepository } from './interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: Partial<User>) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
