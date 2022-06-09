import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login, Props } from 'src/database/schema/login.schema';
import { LoginDto } from 'src/login/dto/login-dto';
import { IDesc, ILogin } from 'src/login/login.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PropsDto } from 'src/login/dto/prop-dto';

@Injectable()
export class LoginRepository {
  constructor(
    @InjectModel(Login.name)
    private readonly loginModel: Model<ILogin>,

    @InjectModel(Props.name)
    private readonly propsModel: Model<IDesc>,
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
                return e;
            }
    } catch(e) {
        return e;
        }
    }

    async addDescription(user :PropsDto,request) {
        try {
            let resultCount = await this.propsModel.findOne({ 'email':request.email }).count();
            if (resultCount == 0){
                const newUser = new this.propsModel({
                    email: request.email,
                    description: user.description
                });
            return await newUser.save();
         } 
        else{
            return await this.propsModel.findOneAndUpdate({ 'email':request.email },{'description':user.description},{ returnOriginal: false })
        }
    } catch(e) {
        return e;
    } 
    }
}
