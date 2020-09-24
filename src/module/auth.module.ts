import { Module } from '@nestjs/common';
import { AuthService } from '../service';
import { AuthController } from '../controller';
import { environment } from '../environment';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from '../strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
}
