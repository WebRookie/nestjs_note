import { Get, Controller, Request, Post, UsePipes, Body } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CommonValidationPipe } from 'src/pipes/validation.pipe';
import { publishSchema } from 'src/common/validators/blog.schema';


@Controller('api')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post('publishBlog')
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
  async getBlogListPage(@Request() req: Request) {

  }
}