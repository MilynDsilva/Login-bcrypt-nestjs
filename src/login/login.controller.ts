import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogintDto } from './dto/login-dto';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

@ApiResponse({ status: 200, description: 'Ok.'})
@ApiResponse({ status: 400, description: 'Bad Request.'})
@ApiResponse({ status: 401, description: 'Unauthorized.'})
@Post('')
    login(@Body() user :LogintDto) {
        return this.loginService.login(user);
    }

@ApiResponse({ status: 200, description: 'Ok.'})
@ApiResponse({ status: 400, description: 'Bad Request.'})
@Post('/sign-up')
    signUp(@Body() user :LogintDto) {
        return this.loginService.signUp(user);
    }
}
