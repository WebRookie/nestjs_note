import { LoginModule } from './../../modules/login/login.module';
import { LoginController } from './../../modules/login/login.controller';
import { LocalStrategy } from './local.strategy';
// import { LoginService } from './../../modules/login/login.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // 密钥暂时叫hello Nest
  imports: [LoginModule, PassportModule, JwtModule.register({secret: 'hello Nest'})],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
