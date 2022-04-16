import { Injectable } from "@nestjs/common";
import { IToken } from "./login.interface";
// import User from 'src/models/user.model'
import { CodeMap } from "src/config/app.config";
import { md5Code } from "src/utils/utils";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


@Injectable()
export class LoginService {

  async findUser(username: string): Promise<any | undefined> {
    try {
      // const user = await User.findAll({
      //   where: {
      //     username: username
      //   }
      // })
      const user = prisma.user.findUnique({
        where: {
          email: username
        }
      })
      return user
    } catch (error) {
      console.log(error)
      return error
    }
  }

  /**
   * 处理token业务
   * 这里要添加token的定时任务，
   * @param token 加密好的token
   */
  async setUserToken(token: string, userId: number) {
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
      const user = await this.findUser(username)
      console.log(user)
      if (user) {
        return {
          code: CodeMap.UserExisted,
          msg: 'User Existed',
          data: null
        }
      }
      // const createUser = await User.create(params)
      const createUser = await prisma.user.create({ data: params })
      console.log(createUser)
      return {
        code: CodeMap.RequestSuccess,
        msg: 'Create Success',
        data: createUser
      }
    } catch (error) {
      console.log(error)
      return error
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

      const token = md5Code(params.username, params.password, params.timestamp)
      this.setUserToken(token, user.userId)
      // 前端应该把返回的token放在后续的请求头里
      user.token = token;
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

}