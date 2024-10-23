import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hosykhanh:khanh%401234@clusterservergame2d.flopf.mongodb.net/users?retryWrites=true&w=majority&appName=clusterServerGame2D',
    ),
  ],
})
export class DatabaseModule {}
