import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';
import { LoginService } from './login.service';
import { Request } from 'express';
import { AuthGuard } from 'src/comman/guards/auth.guard';
import { RequestUser } from 'src/decorator/custom.decorator';
import { PropsDto } from './dto/prop-dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

@ApiResponse({ status: 200, description: 'Ok.'})
@ApiResponse({ status: 400, description: 'Bad Request.'})
@ApiResponse({ status: 401, description: 'Unauthorized.'})
@Post('')
    login(@Body() user :LoginDto) {
        return this.loginService.login(user);
    }

@ApiResponse({ status: 200, description: 'Ok.'})
@ApiResponse({ status: 400, description: 'Bad Request.'})
@Post('/sign-up')
    signUp(@Body() user :LoginDto) {
        return this.loginService.signUp(user);
    }

@ApiResponse({ status: 200, description: 'Ok.'})
@ApiResponse({ status: 400, description: 'Bad Request.'})
@UseGuards(AuthGuard)
@Post('/add-desc')
    addDescription(@Body() user :PropsDto ,@RequestUser() request:Request ) {
        return this.loginService.addDescription(user,request);
    }
}
