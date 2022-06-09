import { Injectable } from '@nestjs/common';
import { LoginRepository } from 'src/repository/login.repository';
import { LoginDto } from './dto/login-dto';
import { PropsDto } from './dto/prop-dto';

@Injectable()
export class LoginService {
    constructor(private readonly repository: LoginRepository) {}

    login(user :LoginDto) {
        return this.repository.login(user);
    }

    signUp(user :LoginDto) {
        return this.repository.signUp(user);
    }

    addDescription(user: PropsDto,request) {
        return this.repository.addDescription(user,request);
    }
}
