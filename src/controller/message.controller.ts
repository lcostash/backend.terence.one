import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from '../service';
import { AjaxResponseInterface, MessageInterface } from '../interface';

@Controller()
export class MessageController {
  /**
   * @param messageService MessageService
   */
  constructor(private messageService: MessageService) {
  }

  /**
   * @since 0.0.1
   * @public
   * @param data MessageInterface
   * @return Promise<AjaxResponseInterface>
   */
  @Post('message')
  public addMessage(@Body() data: MessageInterface): Promise<AjaxResponseInterface> {
    return this.messageService.addMessage(data);
  }
}
