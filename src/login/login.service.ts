import { Injectable } from '@nestjs/common';
import { LoginRepository } from 'src/repository/login.repository';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class LoginService {
    constructor(private readonly repository: LoginRepository) {}

    login(user :LoginDto) {
        return this.repository.login(user);
    }

    signUp(user :LoginDto) {
        return this.repository.signUp(user);
    }

    verify(user: LoginDto) {
        return this.repository.verify(user);
    }
}
