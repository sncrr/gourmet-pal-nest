import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { GoogleUser } from './auth.types';
import { AUTH_TYPE } from '../user/user.contants';
import { BCRYPT_ROUNDS } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {

    const user = await this.userService.findUser({
      where: {
        email: email,
        auth_type: AUTH_TYPE.EMAIL
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

    const hashedPassword = await bcrypt.hash(
      payload.password,
      BCRYPT_ROUNDS,
    );

    const user = await this.userService.createUser({
      ...payload,
      password: hashedPassword,
      auth_type: AUTH_TYPE.EMAIL
    });
    
    if(user && user.id) {
      const jwtPayload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(jwtPayload),
      };
    }
    else {
      throw new InternalServerErrorException('Something went wrong while creating user.')
    }
  }

  async authenticateGoogle(payload: GoogleUser) {

    let user = await this.userService.findUser({
      where: {
        email: payload.email
      }
    });

    if(!user || !user.id) {
      user = await this.userService.createUser({
        email: payload.email,
        first_name: payload.firstName,
        last_name: payload.lastName,
        auth_type: AUTH_TYPE.GOOGLE,
      })
    }

    if(user && user.id) {
      const jwtPayload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(jwtPayload),
      };
    }
    else {
      throw new InternalServerErrorException('Something went wrong while authenticating.')
    }
  }
}