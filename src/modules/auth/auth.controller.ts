import { Body, Controller, Get, InternalServerErrorException, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { BaseController } from 'src/base/base.controller';
import { throwError } from 'rxjs';

@Controller('/auth')
export class AuthController extends BaseController<any> {
  constructor(
    private authService: AuthService
  ) {
    super(authService)
  }

  @Post('/login')
  async login(@Body() body: {
    email: string,
    password: string
  }) {
    try {
      return this.authService.login(body);
    }
    catch(error: any) {
      throw new InternalServerErrorException(error.message);
    }
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

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req:any) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req:any) {

    if (!req.user) {
      throw new UnauthorizedException('Authentication failed.');
    }

    try {
      return this.authService.authenticateGoogle(req.user);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }

  }
}
