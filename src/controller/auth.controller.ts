import { Controller, Post, Body, Request, UseGuards, Get, HttpStatus } from '@nestjs/common';
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
   * @return Promise<AjaxResponseInterface>
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('auth/me')
  public checkMe(): Promise<AjaxResponseInterface> {
    return new Promise((resolve) => resolve({ status: HttpStatus.OK }));
  }

  /**
   * @since 0.0.1
   * @param request Object
   * @param body AuthInterface
   */
  @UseGuards(AuthGuard('local'))
  @Post('auth')
  async signIn(@Request() request, @Body() body: AuthInterface): Promise<AjaxResponseInterface> {
    return await this.authService.signIn(request.user);
  }
}
