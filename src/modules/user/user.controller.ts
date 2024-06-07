import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './services/user.service';

@Controller('api/user')
export class UserController extends BaseController<User> {

  constructor(
    protected userService: UserService,
  ) {
    super(userService);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUserDetails (
    @Request() req: any
  ) {
    try {
      let user = await this.userService.findUser({
        where: {
          id: req.user.userId
        }
      })
      delete user.password;
      return user;
    } catch (error) {
      this.throwError.internalServer(error.message);
    }
  }
}
