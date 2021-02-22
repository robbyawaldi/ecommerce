import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context: { req } }, next) => {
    const user = await User.findOneOrFail(req.session.userId, { relations: ['role'] })
    if (user.role.slug !== 'admin') throw new Error("forbidden")
    return next()
}