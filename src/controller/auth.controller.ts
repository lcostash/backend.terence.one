import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../service';
import { AjaxResponseInterface, AuthInterface } from '../interface';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  /**
   * @param authService AuthService
   */
  constructor(private authService: AuthService) {
  }

  /**
   * @since 0.0.1
   * @public
   * @param request Object
   * @return Promise<AjaxResponseInterface>
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('auth/me')
  public async checkMe(@Request() request): Promise<AjaxResponseInterface> {
    return await this.authService.checkMe(request.user);
  }

  /**
   * @since 0.0.1
   * @public
   * @param request Object
   * @param body AuthInterface
   */
  @UseGuards(AuthGuard('local'))
  @Post('auth/sign-in')
  public async signIn(@Request() request, @Body() body: AuthInterface): Promise<AjaxResponseInterface> {
    return await this.authService.signIn(request.user);
  }
}
