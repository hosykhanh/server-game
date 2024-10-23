import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService],
  controllers: [AuthController],
})
export class AuthModule {}
