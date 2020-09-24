import { Module } from '@nestjs/common';
import { AppController } from '../controller';
import { AppService } from '../service';
import { MessageModule } from './message.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MessageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
