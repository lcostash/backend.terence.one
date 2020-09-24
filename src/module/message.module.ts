import { HttpModule, Module } from '@nestjs/common';
import { MessageService } from '../service';
import { MessageController } from '../controller';
import { environment } from '../environment';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy';

@Module({
  imports: [
    HttpModule.register({
      timeout: environment.http.timeout,
      maxRedirects: environment.http.maxRedirects,
    }),
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
  ],
  providers: [
    MessageService,
    JwtStrategy,
  ],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {
}
