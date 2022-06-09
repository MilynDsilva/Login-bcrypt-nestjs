import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PropsDto {

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    description: string;
}
