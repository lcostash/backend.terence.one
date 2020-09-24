import { Injectable } from '@nestjs/common';
import { PayloadInterface, UserInterface } from '../interface';
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
      role: 1,
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
  public async checkAuth(username: string, password: string): Promise<UserInterface | null> {
    return new Promise((resolve, reject) => {
      const users: UserInterface[] = this.users.filter((u: UserInterface) => u.username === username);
      if (!users || users.length < 1) reject(null);
      const isPasswordValid = typeof users[0].password === 'string' && typeof password === 'string'
        ? users[0].password.localeCompare(password, undefined, { sensitivity: 'accent' }) === 0
        : users[0].password === password;
      isPasswordValid ? resolve(users[0]) : reject(null);
    });
  }

  /**
   * @since 0.0.1
   * @param user UserInterface
   * @return Promise<any>
   */
  async signIn(user: UserInterface): Promise<any> {
    return new Promise((resolve) => {
      resolve({
        token: this.jwtService.sign({ uuid: user.uuid }),
        profile: {
          uuid: user.uuid,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
    });
  }

  /**
   * @since 0.0.1
   * @param payload PayloadInterface
   * @return Promise<any>
   */
  async checkMe(payload: PayloadInterface): Promise<any> {
    return new Promise((resolve, reject) => {
      const users: UserInterface[] = this.users.filter((u: UserInterface) => u.uuid === payload.uuid);
      if (!users || users.length < 1) reject(null);
      resolve({
        token: this.jwtService.sign({ uuid: users[0].uuid }),
        profile: {
          uuid: users[0].uuid,
          firstName: users[0].firstName,
          lastName: users[0].lastName,
          role: users[0].role,
        },
      });
    });
  }
}
