import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from 'src/database/schema/login.schema';
import { LogintDto } from 'src/login/dto/login-dto';
import { ILogin } from 'src/login/login.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
let TOKEN_SECRET='b91028378997c0b3581821456edefd0ec7958f953f8c1a6dd856e2de27f0d7e0fb1a01cda20d1a6890267e629f0ff5dc7ee46bce382aba62d13989614417606a'

@Injectable()
export class LoginRepository {
  constructor(
    @InjectModel(Login.name)
    private readonly loginModel: Model<ILogin>,
    ) {}
  
    async signUp(data: LogintDto) {
        try {
                let resultCount = await this.loginModel.findOne({ 'email': { '$regex': data.email, '$options': 'i' } }).count()
                if (resultCount == 0){
                const hashedPassword = await bcrypt.hash(data.password, 10);
                const user = new this.loginModel({
                email: data.email,
                password: hashedPassword,
            });
            return await user.save();
        } 
            return {message:'email already exisits' , status :HttpStatus.CONFLICT};
        } catch(e) {
            return e;
        } 
    }
    
    async login(data: LogintDto) {
        try {
            let user = await this.loginModel.findOne({ 'email': { '$regex': data.email, '$options': 'i' } })
            try{
                const match = await bcrypt.compare(data.password, user.password);
                let accessToken = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '24h', algorithm: 'HS256'})
                if(match){
                    return { accessToken: accessToken };
                } else {
                    return { message: "Invalid Credentials" };
                }
            } catch(e) {
                console.log(e)
            }
    } catch(e) {
        return e;
    }
    }
}
