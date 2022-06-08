import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from 'src/database/schema/login.schema';
import { LoginDto } from 'src/login/dto/login-dto';
import { ILogin } from 'src/login/login.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginRepository {
  constructor(
    @InjectModel(Login.name)
    private readonly loginModel: Model<ILogin>,
    ) {}
  
    async signUp(data: LoginDto) {
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
    
    async login(data: LoginDto) {
        try {
            let user = await this.loginModel.findOne({ 'email': { '$regex': data.email, '$options': 'i' } })
            try{
                const match = await bcrypt.compare(data.password, user.password);
                let accessToken = jwt.sign({ id:user._id , email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '24h', algorithm: 'HS256'})
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

    async verify(user :LoginDto) {
        return user;
    //     try {
    //         const token = headers['authorization'];
    //         const tokenDecodablePart = token.split('.')[1];
    //         const decoded = JSON.parse(Buffer.from(tokenDecodablePart, 'base64').toString());
    //         if(decoded['email'] == user.email)
    //             return {auth:true , message:"Verfied successfully"};
    //         return {auth:false , message:"Verfication failed"}
    //     } catch (error) {
    //         return error;
    //     }  
      }
}
