import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {

    const user = await this.userService.findUser({
      where: {
        email: email
      }
    });
    
    if (user) {
      let passwordValid = await bcrypt.compare(password, user.password);
      if(passwordValid) return user;
    }
    return null;
  }

  async login(payload: {
    email: string,
    password: string
  }) {

    const user = await this.validateUser(payload.email, payload.password);
    if(user) {
      const jwtPayload = { email: user.email, sub: user.id };
    
      return {
        access_token: this.jwtService.sign(jwtPayload)
      };
    }
    else {
      throw new UnauthorizedException('Incorrect email or password.');
    }
  }

  async register(payload: any) {
    const user = await this.userService.createUser(payload);
    if(user && user.id) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    else {
      throw new InternalServerErrorException('Something went wrong while creating user.')
    }
  }
}