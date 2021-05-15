import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ulid } from "ulid";
import { User } from "../entities/User";
import { Role } from "../entities/Role";

export default class CreateAdmin implements Seeder {
    public async run(_: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .delete()
            .from(User)
            .execute()

        await connection
            .createQueryBuilder()
            .delete()
            .from(Role)
            .execute()

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
                    password: 'Sitihajar28',
                    role: await Role.findOne(1)
                }
            ])
            .execute()
    }
}