import { Injectable } from '@nestjs/common';
import { UserInterface } from '../interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users: UserInterface[] = [
    {
      uuid: '174b2a7f-adb0-4000-8497-cc4d75516200',
      firstName: 'Lilian',
      lastName: 'Costas',
      username: 'lcostash@gmail.com',
      password: 'Qq123456_',
    },
  ];

  /**
   * @param jwtService JwtService
   */
  constructor(private jwtService: JwtService) {
  }

  /**
   * @since 0.0.1
   * @param username string
   * @param password string
   * @return Promise<UserInterface | null>
   */
  public async validate(username: string, password: string): Promise<UserInterface | null> {
    return new Promise((resolve) => {
      const users: UserInterface[] = this.users.filter((u: UserInterface) => u.username === username);
      if (!users || users.length === 0 || users[0]) resolve(null);
      this.isPasswordValid(users[0].password, password).catch(() => resolve(null));
      resolve(users[0]);
    });
  }

  /**
   * @since 0.0.1
   * @param a string
   * @param b string
   * @return Promise<any>
   */
  private async isPasswordValid(a, b): Promise<any> {
    return new Promise((resolve, reject) => {
      const result = typeof a === 'string' && typeof b === 'string'
        ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
        : a === b;
      result ? resolve() : reject();
    });
  }

  /**
   * @since 0.0.1
   * @param user UserInterface
   * @return Promise<any>
   */
  async signIn(user: UserInterface): Promise<any> {
    return {
      token: this.jwtService.sign({
        uuid: user.uuid,
      }),
    };
  }
}
