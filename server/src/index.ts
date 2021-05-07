import "reflect-metadata";
import "dotenv-safe/config";
import { __prod__, COOKIE_NAME } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import cors from "cors";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import path from "path";
import { createUserLoader } from "./utils/createUserLoader";
import { Role } from "./entities/Role";
import { Product } from "./entities/Product";
import { Size } from "./entities/Size";
import { Category } from "./entities/Category";
import { Image } from "./entities/Image";
import { ProductResolver } from "./resolvers/product";
import { ImageResolver } from "./resolvers/image";
import { graphqlUploadExpress } from "graphql-upload";
import { SizeResolver } from "./resolvers/size";
import { CategoryResolver } from "./resolvers/category";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: !__prod__,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [
      User,
      Role,
      Product,
      Size,
      Category,
      Image,
    ],
  });

  const app = express();

  const RedisStore = require('connect-redis')(session);

  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        // sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? process.env.DOMAIN : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(express.static('public'))

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        ProductResolver,
        ImageResolver,
        SizeResolver,
        CategoryResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
    }),
    playground: {
      settings: {
        'request.credentials': 'same-origin'
      }
    },
    uploads: false
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
