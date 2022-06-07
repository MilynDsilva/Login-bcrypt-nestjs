import { Injectable } from '@nestjs/common';
import { LoginRepository } from 'src/repository/login.repository';
import { LogintDto } from './dto/login-dto';

@Injectable()
export class LoginService {
    constructor(private readonly repository: LoginRepository) {}

    login(user :LogintDto) {
        return this.repository.login(user);
    }

    signUp(user :LogintDto) {
        return this.repository.signUp(user);
    }
}
