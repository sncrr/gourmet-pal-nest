import { Body, Controller, Get, InternalServerErrorException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/login')
  async login(@Body() body: {
    email: string,
    password: string
  }) {
    return this.authService.login(body);
  }

  @Post('/register')
  async register(@Body() body: {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  }) {
    try {
      return this.authService.register(body);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
