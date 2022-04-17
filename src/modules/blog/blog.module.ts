import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Module } from "@nestjs/common";


@Module({
  providers:[BlogService],
  controllers: [BlogController]
})

export class BlogModule {}