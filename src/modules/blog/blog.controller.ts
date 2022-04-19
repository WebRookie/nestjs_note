import { Get, Controller, Request, Post, UsePipes, Body, UseGuards, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CommonValidationPipe } from 'src/pipes/validation.pipe';
import { publishSchema, getAllBlogSchema } from 'src/common/validators/blog.schema';
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

  @Get('getBlogListPage')
  @SkipAuth()
  @UsePipes(new CommonValidationPipe(getAllBlogSchema))
  async getAllBlogPage(@Query() req: Request) {
    try {
      return await this.blogService.getBlogListPage(req)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}