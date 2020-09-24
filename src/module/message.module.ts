import { Module } from '@nestjs/common';
import { MessageService } from '../service';
import { MessageController } from '../controller';

@Module({
  imports: [],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {
}
