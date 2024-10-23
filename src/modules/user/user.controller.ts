import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: any) {
    const user = await this.userService.create(createUserDto);
    if (!user) {
      return { status: 'err', message: 'The user does not create' };
    }

    return {
      status: 'OK',
      message: 'Resgister successful',
      user,
    };
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Patch(':id/progress')
  async updateProgress(
    @Param('id') id: string,
    @Body() newScreenProgress: { screen: number; point: number },
  ) {
    const updatedUser = await this.userService.updateProgress(
      id,
      newScreenProgress,
    );
    if (!updatedUser) {
      return { status: 'err', message: 'Failed to update progress' };
    }

    return {
      status: 'OK',
      message: 'Progress updated successfully',
      updatedUser,
    };
  }
}
