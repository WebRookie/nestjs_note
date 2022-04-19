import { jwtConstant } from './../../common/auth/constants';
import { LoginService } from 'src/modules/login/login.service';
import { JwtStrategy } from 'src/common/auth/jwt.stragegy';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';


@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: {
        expiresIn: '1d'
      }
    })
  ],
  providers:[BlogService, JwtStrategy, LoginService,{ provide: APP_GUARD, useClass: JwtAuthGuard}],
  controllers: [BlogController],
  exports: [BlogService]
})

export class BlogModule {}