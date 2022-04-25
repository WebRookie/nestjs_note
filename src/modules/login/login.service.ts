import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable } from "@nestjs/common";
import { IToken } from "./login.interface";
// import User from 'src/models/user.model'
import { CodeMap } from "src/config/app.config";
import { md5Code } from "src/utils/utils";
import { PrismaClient } from "@prisma/client";
import { jwtConstant } from 'src/common/auth/constants';
const prisma = new PrismaClient()

interface uniqueParams {
  username?: string,
  userId?: number
}

@Injectable()
export class LoginService {

  constructor(private readonly jwtService: JwtService) { }

  async findUser(uniqueP: uniqueParams): Promise<any | undefined> {
    try {
      // const user = await User.findAll({
      //   where: {
      //     username: username
      //   }
      // })
      const user = prisma.user.findFirst({
        where: {
          OR: [
            {
              email: uniqueP.username,
            },
            {
              userId: uniqueP.userId
            }
          ]
        }
      })
      return user
    } catch (error) {
      console.log(error)
      return error
    }
  }

  /**
   * 
   * @param username {email邮箱}
   * @param password {用户密码}
   * @returns 用户信息
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.findUser({ username: username })
    if (user?.password === password) {
      const { password, ...userInfo } = user
      return userInfo
    } else {
      return null
    }
  }

  async validateAuthData(payload: any): Promise<any> {
    // console.log(payload)
  }

  /**
   * 处理token业务
   * 这里要添加token的定时任务，
   * @param token 加密好的token
   */
  async updateUserToken(token: string, userId: number) {
    try {
      await prisma.user.update({
        where: {
          userId: userId,
        },
        data: {
          token: token
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 注册
   * @param params 注册参数
   * @returns 组册状态
   */
  async registUser(params: any) {
    try {
      const username = params.email;
      const user = await this.findUser({ username: username })
      if (user) {
        return {
          code: CodeMap.UserExisted,
          msg: 'User Existed',
          data: null
        }
      }
      await prisma.user.create({ data: params })
      // const createUser = await prisma.user.create({ data: params ,select: {
      //   userId: true,
      //   nickname: true,
      //   email: true,
      //   role: true,
      // }})
      return {
        code: CodeMap.RequestSuccess,
        msg: 'Create Success',
        data: null
      }
    } catch (error) {
      console.log(error)
      throw new HttpException({ data: error }, 500)
    }

  }

  async loginHandler(params: any) {
    try {
      const user: any = await prisma.user.findFirst({
        where: {
          email: params.username,
          password: params.password
        },
        select: {
          userId: true,
          email: true,
          nickname: true,
          role: true,
          createdTime: false,
          updatedTime: false
        }
      })
      if (!user) {
        return {
          code: CodeMap.AccountOrPwdError,
          msg: 'Account Or Password Error',
          data: null
        }
      }
      // sign 内容体是payload，不能有敏感内容
      const Access_Token = this.jwtService.sign({ username: params.username, role: user.role }, { secret: jwtConstant.secret })
      // const token = md5Code(params.username, params.password, params.timestamp)
      this.updateUserToken(Access_Token, Number(user.userId))
      // 前端应该把返回的token放在后续的请求头里
      user.token = Access_Token;
      return {
        code: CodeMap.RequestSuccess,
        msg: 'Login Successfully',
        data: user
      }

    } catch (error: any) {
      console.trace(error)
      return error
    }
  }

  async getUserInfo(params: any) {
    try {
      const user = await this.findUser(params)
      console.log(user)
      return {
        code: CodeMap.RequestSuccess,
        msg: 'Get Info Successfully',
        data: user
      }
    } catch (error) {
      return new HttpException({ data: error}, 500)
    }
  }

}