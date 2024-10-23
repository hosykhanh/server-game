import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      return { status: 'err', message: 'The user does not exist' };
    }

    if (loginDto.password !== user.password) {
      return { status: 'err', message: 'Email or password is incorrect' };
    }

    return {
      status: 'OK',
      message: 'Login successful',
      user,
    };
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json({
        status: 'OK',
        message: 'Logout successfully',
      });
    } catch {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  }
}
