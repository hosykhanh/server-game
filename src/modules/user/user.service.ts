import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateProgress(
    userId: string,
    newScreenProgress: { screen: number; point: number },
  ): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new Error('User not found');
    }

    // Kiểm tra màn đã tồn tại chưa
    const existingScreen = user.screenProgress.find(
      (progress) => progress.screen === newScreenProgress.screen,
    );

    if (existingScreen) {
      // Nếu màn đã tồn tại, so sánh điểm số
      if (newScreenProgress.point > existingScreen.point) {
        existingScreen.point = newScreenProgress.point; // Cập nhật điểm số mới
      }
    } else {
      // Nếu màn chưa tồn tại, thêm mới vào danh sách
      user.screenProgress.push(newScreenProgress);
    }

    // Lưu lại thay đổi
    return user.save();
  }
}
