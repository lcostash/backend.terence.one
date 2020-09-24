import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { validate } from 'class-validator';
import { ValidationError } from 'class-validator/types/validation/ValidationError';
import { AjaxResponseInterface, MessageInterface } from '../interface';
import { Message } from '../entity';
import { environment } from '../environment';

@Injectable()
export class MessageService {
  /**
   * @since 0.0.1
   * @return Promise<AjaxResponseInterface>
   */
  public async fetchMessages(): Promise<AjaxResponseInterface> {
    // get the list of existing messages
    const rows = await MessageService.getMessages(true);

    return {
      status: HttpStatus.OK,
      rows: rows,
    };
  }

  /**
   * @since 0.0.1
   * @param data MessageInterface
   * @return Promise<AjaxResponseInterface>
   */
  public async addMessage(data: MessageInterface): Promise<AjaxResponseInterface> {

    // create the message object
    // and attach the income data to it
    const message = new Message();
    message.id = data.id;
    message.name = data.message;
    message.email = data.email;
    message.message = data.message;
    message.subscribed = data.subscribed ? 1 : 0;
    message.createdAt = new Date();

    // validate the income data
    await validate(message).then((errors: ValidationError[]) => {
      if (errors.length > 0) throw new BadRequestException(errors);
    });

    // save the income data
    await MessageService.setMessage(message).catch(() => {
      throw new InternalServerErrorException('Apologise, we can not save your message. Please, try it latter.');
    });

    return {
      status: HttpStatus.OK,
      message: 'Your message was successfully saved.',
    };
  }

  /**
   * @since 0.0.1
   * @private
   * @static
   * @param message MessageInterface
   * @return Promise<any>
   */
  private static async setMessage(message: MessageInterface): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // require fs module
      const fs = require('fs');

      // get the list of existing messages
      const messages = await MessageService.getMessages();

      // add new id if it iz equal with zero
      message.id = message.id === 0 ? messages.length + 1 : message.id;

      // push new message into array
      messages.push(message);

      // save the results into the file
      fs.writeFile(environment.file.messages, JSON.stringify(messages), error => {
        error ? reject() : resolve();
      });
    });
  }

  /**
   * @since 0.0.1
   * @private
   * @static
   * @param latestRecordsFirst boolean If true, the array will be sorted by createdAt desc
   * @return Promise<MessageInterface[]>
   */
  private static async getMessages(latestRecordsFirst: boolean = false): Promise<MessageInterface[]> {
    return new Promise((resolve) => {
      // require fs module
      const fs = require('fs');

      // read the content from file
      fs.readFile(environment.file.messages, 'utf8', (error, data) => {
        const rows = error ? [] : JSON.parse(data);
        if (latestRecordsFirst) {
          rows.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0));
        }
        resolve(rows);
      });
    });
  }
}
