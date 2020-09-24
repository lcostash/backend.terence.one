import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { MessageService } from '../service';
import { AjaxResponseInterface, MessageInterface } from '../interface';
import { CaptchaGuard } from '../guard';
import { AuthGuard } from '@nestjs/passport';

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
   * @return Promise<AjaxResponseInterface>
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('messages')
  public fetchMessages(): Promise<AjaxResponseInterface> {
    return this.messageService.fetchMessages();
  }

  /**
   * @since 0.0.1
   * @public
   * @param data MessageInterface
   * @return Promise<AjaxResponseInterface>
   */
  @UseGuards(CaptchaGuard)
  @Post('message')
  public addMessage(@Body() data: MessageInterface): Promise<AjaxResponseInterface> {
    return this.messageService.addMessage(data);
  }
}
