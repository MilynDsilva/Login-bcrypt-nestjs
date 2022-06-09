export class RequestUserDto {
    constructor(
        public id: string,
        public email: string,
        public iat: number,
        public exp: number
    ){}
}