import {FieldMessageInterface} from './field-message.interface';

export declare interface AjaxResponseInterface {
  status: number;
  message?: string;
  rows?: Array<any>;
  row?: any;
  fm?: Array<FieldMessageInterface>;
}
