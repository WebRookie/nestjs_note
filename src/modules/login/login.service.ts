import { Injectable } from "@nestjs/common";
import { IToken } from "./login.interface";
import User from 'src/models/user.model'



@Injectable()
export class LoginService {

  async findUser(username: string): Promise<any | undefined> {
    try {
      const user = await User.findAll({
        where: {
          username: username
        }
      })
      return user
    } catch (error) {
      console.log(error)
      return error
    }
  }


  async registUser(params: any) {
    try {
      const username = params.email;
      const user = this.findUser(username)
      console.log(user)
      if (user) {
        return {
          code: 20000,
          msg: '当前用户已存在',
          data: null
        }
      }
      const createUser = await User.create(params)
      return {
        code: 20000,
        msg: '创建成功',
        data: createUser
      }
    } catch (error) {
      console.log(error)
      return error
    }


  }

}