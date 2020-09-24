import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { registerSchema, validate } from 'class-validator';
import { AuthService } from '../service';
import { LocalValidation } from '../validation';
import { ValidationError } from 'class-validator/types/validation/ValidationError';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * @param authService
   */
  constructor(private authService: AuthService) {
    super();
    registerSchema(LocalValidation);
  }

  /**
   * @since 0.0.1
   * @param username string
   * @param password string
   */
  async validate(username: string, password: string): Promise<any> {
    const body = { username: username, password: password };
    await validate('LocalValidationSchema', body).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    });
    const user = await this.authService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
