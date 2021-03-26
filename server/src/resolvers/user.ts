import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  UseMiddleware,
  Int,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { getConnection } from "typeorm";
import { ulid } from 'ulid'
import { isAuth } from "../middleware/isAuth";
import { isAdmin } from "../middleware/isAdmin";
import { FieldError } from "./FieldError";
import { ErrorMessage } from "../static/errorMessage";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class PaginatedUsers {
  @Field(() => [User])
  users: User[];
  @Field()
  hasMore: boolean;
}

@Resolver(User)
export class UserResolver {

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    return User.findOne(req.session.userId, { relations: ["role"] });
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  user(@Arg("id", () => String) id: string): Promise<User | undefined> {
    return User.findOne(id, { relations: ["role"] });
  }

  @Query(() => PaginatedUsers)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async users(
    @Arg('limit', () => Int) limit: number,
  ): Promise<PaginatedUsers> {
    const realLimit = Math.min(50, limit)
    const realLimitPlusOne = realLimit + 1

    const qb = getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect('user.role', 'role')
      .take(realLimitPlusOne);

    const users = await qb.getMany();

    return {
      users: users.slice(0, realLimit),
      hasMore: users.length === realLimitPlusOne
    }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async register(
    @Arg("options") options: UsernamePasswordInput,
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          id: ulid(),
          name: options.name,
          email: options.email,
          password: hashedPassword,
          roleId: options.roleId
        })
        .execute();
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "name",
              message: ErrorMessage.User.NAME_ALREADY,
            },
          ],
        };
      }
    }
    return {}
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: email }, relations: ['role'] });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: ErrorMessage.User.EMAIL_NOT_EXIST,
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: ErrorMessage.User.PASSWORD_INCORRECT,
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Mutation(() => UserResponse, { nullable: true })
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async updateUser(
    @Arg('id', () => String) id: number,
    @Arg('options') options: UsernamePasswordInput
  ): Promise<UserResponse> {

    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    let { password, ...opt } = options

    if (password) {
      password = await argon2.hash(options.password)
    }

    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(password ? { ...opt, password } : { ...opt })
        .where('id = :id', { id })
        .execute()
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "name",
              message: ErrorMessage.User.NAME_ALREADY,
            },
          ],
        };
      }
    }
    return {}
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async deleteUser(
    @Arg("id", () => String) id: string,
  ): Promise<boolean> {
    await User.delete(id);
    return true;
  }
}
