import { Module } from '@nestjs/common';
import { AuthService } from '../service';
import { AuthController } from '../controller';
import { environment } from '../environment';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from '../strategy';

@Module({
  imports: [
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
