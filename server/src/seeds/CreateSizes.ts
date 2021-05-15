import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Size } from "../entities/Size";

export default class CreateAdmin implements Seeder {
    public async run(_: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .delete()
            .from(Size)
            .execute()

        await connection
            .createQueryBuilder()
            .insert()
            .into(Size)
            .values([
                {
                   name: 'XS',
                   description: 'Extra Small'
                },
                {
                    name: 'S',
                    description: 'Small'
                },
                {
                    name: 'M',
                    description: 'Medium'
                },
                {
                    name: 'ML',
                    description: 'Medium Large'
                },
                {
                    name: 'L',
                    description: 'Large'
                },
                {
                    name: 'XL',
                    description: 'Extra Large'
                },
                {
                    name: 'XXL',
                    description: 'Double Extra Large'
                },
                {
                    name: 'ALL SIZE',
                    description: 'One Size Fits All'
                },
            ])
            .execute()
    }
}