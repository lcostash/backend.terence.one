import { Injectable, CanActivate, ExecutionContext, HttpService, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { AxiosResponse } from 'axios';

@Injectable()
export class CaptchaGuard implements CanActivate {
  /**
   * @param httpService HttpService
   */
  constructor(private httpService: HttpService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve, reject) => {
      const data = context.switchToRpc().getData();
      if (!data || !data['body'] || !data['body'].captcha) reject(false);

      // check if captcha is valid
      await this.checkCaptcha(data['body'].captcha)
        .then((response: boolean) => response ? resolve(true) : reject(new UnauthorizedException()))
        .catch(() => reject(new UnauthorizedException()));

    });
  }

  /**
   * @since 0.0.1
   * @param captcha
   * @return Promise<any>
   */
  private async checkCaptcha(captcha: string): Promise<boolean> {
    const secretKey = environment.reCaptcha.secretKey;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;
    return await this.httpService.get(url).toPromise()
      .then((response: AxiosResponse) => (response && response.status === 200 && response.data && response.data.success) ? response.data.success : false)
      .catch(() => false);
  }
}
