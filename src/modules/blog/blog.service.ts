import { comment } from './../../common/validators/blog.schema';
import { BadRequestException, HttpException } from '@nestjs/common';
import { LoginService } from 'src/modules/login/login.service';
import prisma from 'src/common/globalEntity/prisma.client'
import { CodeMap } from './../../config/app.config';

interface IComments {
  list: boolean
}

// comments : true  这里直接要求返回comments ts语法检测会提示错误，所以使用接口的形式来规范一下

export class BlogService {

  constructor(private readonly loginService: LoginService) { }

  async publishBlog(params: any) {
    try {
      const { userId } = params
      // 首先检查当前用户存在否？
      const user = await prisma.user.findFirst({
        where: {
          userId: userId,
        }
      })
      // 存在当前用户才能继续操作
      if (user) {
        await prisma.blog.create({
          data: params
        })
        return {
          code: CodeMap.RequestSuccess,
          msg: 'Publish Successfully',
          data: null
        }
      } else {
        return new BadRequestException("User Didn't Exist")
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getBlogListPage(request: any) {
    try {
      const pageSize = 10;
      const listPage = await prisma.blog.findMany({
        // where: {
        //   userId: request.userId && Number(request.userId)
        // },
        include: {
          comments: true,
        },
        skip: (Number(request.pageNo) - 1) * pageSize, take: pageSize,
      })
      // TODO 返回的时间没有设置
      return {
        code: CodeMap.RequestSuccess,
        msg: 'Get Page Successfully',
        data: listPage
      }
    } catch (error) {
      console.log(error)
      return new HttpException({ statusCode: 500, message: error }, 500)
    }
  }

  async updateBlogInfo(request: any) {
    try {
      const blog = await prisma.blog.findFirst({
        where: {
          AND: [
            {
              userId: request.userId
            },
            {
              blogId: request.blogId
            }
          ]
        }
      })
      console.log(blog)
      if (!blog) {
        return {
          code: CodeMap.ParameterUnMatched,
          msg: "User Don't Matched",
          data: null
        }
      }
      const updatedBlog = await prisma.blog.update({
        where: {
          blogId: request.blogId
        },
        data: request
      })
      return {
        code: CodeMap.RequestSuccess,
        msg: 'Updated Successfully',
        data: updatedBlog
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async comment(request: any) {
    try {
      const { userId, blogId } = request
      const user = await prisma.user.findFirst({
        where: {
          userId: userId
        }
      })
      if (!user) {
        return {
          code: CodeMap.UserNotExist,
          msg: 'User Don\'t Exist',
          data: null
        }
      }
      const blog = await prisma.blog.findFirst({
        where: {
          blogId: blogId
        }
      })
      if (!blog) {
        return {
          code: CodeMap.RequestNotExist,
          msg: 'Content Requested Do not Exist',
          data: null
        }
      }

      await prisma.comment.create({
        data: request
      })
      return {
        code: CodeMap.RequestSuccess,
        msg: 'Comment Successfully',
        data: null
      }
    } catch (error) {
      console.log(error)
      return new HttpException({ statusCode: 500, message: error }, 500)
    }
  }
}