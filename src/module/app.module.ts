import { Module } from '@nestjs/common';
import { AppController } from '../controller';
import { AppService } from '../service';
import { MessageModule } from './message.module';

@Module({
  imports: [MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
