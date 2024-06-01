import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BCRYPT_ROUNDS } from 'src/constants';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'user');
  }

  async findUser (params : {
    where: Prisma.UserWhereUniqueInput, 
    select?: Prisma.UserSelect,
    include?: Prisma.UserInclude,
  }) {
    return await this.findOne(params);
  }

  async findUsers (params : {
    where: Prisma.UserWhereUniqueInput, 
    select?: Prisma.UserSelect,
    include?: Prisma.UserInclude,
  }) {
    return await this.findMany(params);
  }


  async createUser (payload: Prisma.UserCreateInput) {
    let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    let emailValid = emailRegex.test(payload.email);

    if(emailValid) {
      const hashedPassword = await bcrypt.hash(
        payload.password,
        BCRYPT_ROUNDS,
      );

      return await this.create({
        ...payload,
        password: hashedPassword,
        auth_type: 'email'
      });
    }
    else {
      throw new UnprocessableEntityException('Email is not valid');
    }
  }

  async updateUser (params: {
    where: Prisma.UserWhereInput, 
    data: Prisma.UserUpdateInput,
  }) {
    return await this.update({
      where: params.where,
      data: params.data
    });
  }

  async deleteUser (where: Prisma.UserWhereInput) {
    return await this.delete({where});
  }
}