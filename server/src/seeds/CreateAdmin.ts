import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ulid } from "ulid";
import { User } from "../entities/User";
import argon2 from "argon2";
import { Role } from "../entities/Role";

export default class CreateAdmin implements Seeder {
    public async run(_: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values([
                {
                    id: 1,
                    name: 'Admin',
                    slug: 'admin'
                },
                {
                    id: 2,
                    name: 'Data Entry',
                    slug: 'data_entry'
                }
            ])
            .execute()

        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    id: ulid(),
                    name: 'admin',
                    email: 'admsitihajar@gmail.com',
                    password: await argon2.hash('Sitihajar28'),
                    role: await Role.findOne(1)
                }
            ])
            .execute()
    }
}