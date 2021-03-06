export declare interface MessageInterface {
  id: number;
  name: string;
  email: string;
  message: string;
  subscribed: number;
  captcha?: string;
  createAt?: Date;
}
