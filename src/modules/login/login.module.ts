import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { Module } from "@nestjs/common";
import { JwtStrategy } from 'src/common/auth/jwt.stragegy';
import { LocalStrategy } from 'src/common/auth/local.strategy';
import { jwtConstant } from 'src/common/auth/constants';




@Module({
  imports: [PassportModule, JwtModule.register({ secret: jwtConstant.secret, signOptions: { expiresIn: '1d' } })],
  providers: [LoginService, JwtStrategy, LocalStrategy],
  controllers: [LoginController],
  exports: [LoginService, JwtModule]
})


export class LoginModule { }
