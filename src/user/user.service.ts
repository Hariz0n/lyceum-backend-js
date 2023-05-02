import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async addUser(user: Omit<User, 'id'>) {
    const newUser = this.userRepo.create(user);
    return await this.userRepo.save(newUser);
  }

  async getAllUsers() {
    return this.userRepo.find();
  }

  async getUserByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }
}
