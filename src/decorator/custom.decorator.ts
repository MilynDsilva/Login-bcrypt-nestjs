import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RequestUser = createParamDecorator(
    (prop: string, ctx: ExecutionContext) => {
        let req = ctx.switchToHttp().getRequest()
        return prop ? req.user[prop] : req.user
    }
)