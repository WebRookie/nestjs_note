import { Get, Controller, Request } from '@nestjs/common';
import { BlogService } from './blog.service';


@Controller('api')
export class BlogController {
  constructor(private readonly blogService: BlogService){}

  @Get('getBlogListPage')
  async getBlogListPage(@Request() req: Request ) {

  }
}