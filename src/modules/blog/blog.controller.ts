import { CodeMap } from 'src/config/app.config';
import { Get, Controller, Request, Post, UsePipes, Body, UseGuards, Query, HttpException, HttpCode, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CommonValidationPipe } from 'src/pipes/validation.pipe';
import { publishSchema, getAllBlogSchema, updateBlogInfo, comment } from 'src/common/validators/blog.schema';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { SkipAuth } from 'src/common/auth/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import { createWriteStream } from 'fs';


@Controller('api')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post('publishBlog')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new CommonValidationPipe(publishSchema))
  @HttpCode(200)
  async publishBlog(@Body() req: Request) {
    try {
      return await this.blogService.publishBlog(req)
    } catch (error) {
      console.log(error)
      return error
    }
  }

  @SkipAuth()
  @Get('getBlogListPage')
  @UsePipes(new CommonValidationPipe(getAllBlogSchema))
  async getAllBlogPage(@Query() req: Request) {
    try {
      return await this.blogService.getBlogListPage(req)
    } catch (error) {
      console.log(error)
      return error
    }
  }

  @Post('updateBlog')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new CommonValidationPipe(updateBlogInfo))
  async updateBlogInfo(@Body() req: Request) {
    try {
      return this.blogService.updateBlogInfo(req)
    } catch (error) {
      console.log(error)
      throw new HttpException({ message: 'Server Error' }, 500)
    }
  }

  @Post('comment')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new CommonValidationPipe(comment))
  @HttpCode(200)
  async comment(@Body() req: Request) {
    try {
      return this.blogService.comment(req)
    } catch (error) {
      console.log(error)
      return error
    }
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    /**
     * path.join() 用于将所有给定的path连接在一起。然后规范生成路径
     * 
     */

    try {
      console.log(file)
      const { originalname, buffer } = file
      const filePath = path.join(__dirname, '../../log/')
      const fileUrl =  filePath + originalname
      const writeImage = createWriteStream(path.join(__dirname, '../../log',`/${originalname}`))
      writeImage.write(buffer)
      console.log(filePath)
      return {
        code: CodeMap.RequestSuccess,
        msg: 'Upload Successfully',
        // data: fileUrl
        data: fileUrl.replace(/\\/g, "/")
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
}