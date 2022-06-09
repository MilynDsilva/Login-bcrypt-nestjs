import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Login , LoginSchema, Props, PropsSchema } from 'src/database/schema/login.schema';
import { LoginRepository } from 'src/repository/login.repository';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports:[MongooseModule.forFeature([
    { name: Login.name, schema: LoginSchema },
    { name: Props.name, schema: PropsSchema },
  ]),
],
  controllers: [LoginController],
  providers: [LoginService,LoginRepository]
})
export class LoginModule {}
