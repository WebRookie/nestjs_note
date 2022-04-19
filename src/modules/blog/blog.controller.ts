import { Get, Controller, Request, Post, UsePipes, Body, UseGuards, Query, HttpException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CommonValidationPipe } from 'src/pipes/validation.pipe';
import { publishSchema, getAllBlogSchema, updateBlogInfo } from 'src/common/validators/blog.schema';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { SkipAuth } from 'src/common/auth/constants';


@Controller('api')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post('publishBlog')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new CommonValidationPipe(publishSchema))
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
      throw new HttpException({message:'Server Error'}, 500)
    }
  }
}