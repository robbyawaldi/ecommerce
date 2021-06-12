import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
// import { Category } from "../entities/Category";

export default class CreateAdmin implements Seeder {
    public async run(_: Factory, connection: Connection): Promise<any> {
        connection.isConnected
    //     await connection
    //         .createQueryBuilder()
    //         .delete()
    //         .from(Category)
    //         .execute()

    //     await connection
    //         .createQueryBuilder()
    //         .insert()
    //         .into(Category)
    //         .values([
    //             {
    //                 name: 'Pakaian',
    //                 level: 0,
    //                 sequence: 1
    //             },
    //             {
    //                 name: 'Kerudung',
    //                 level: 0,
    //                 sequence: 2
    //             },
    //             {
    //                 name: 'Ciput',
    //                 level: 0,
    //                 sequence: 3
    //             },
    //         ])
    //         .execute()

    //     const categories = await connection
    //         .getRepository(Category)
    //         .createQueryBuilder('category')
    //         .where('category.name IN (:...name)', { name: ['Pakaian', 'Kerudung', 'Ciput'] })
    //         .getMany()

    //     await connection
    //         .createQueryBuilder()
    //         .insert()
    //         .into(Category)
    //         .values([
    //             {
    //                 name: 'Gamis',
    //                 parent: categories[0],
    //                 level: 1
    //             },
    //             {
    //                 name: 'Tunik',
    //                 parent: categories[0],
    //                 level: 1
    //             },
    //             {
    //                 name: 'Set Celana',
    //                 parent: categories[0],
    //                 level: 1
    //             },
    //             {
    //                 name: "Set Syar'i",
    //                 parent: categories[0],
    //                 level: 1
    //             },
    //             {
    //                 name: 'Kerudung Khimar',
    //                 parent: categories[1],
    //                 level: 1
    //             },
    //             {
    //                 name: 'Bergo',
    //                 parent: categories[1],
    //                 level: 1
    //             },
    //             {
    //                 name: 'Kerudung Segiempat',
    //                 parent: categories[1],
    //                 level: 1
    //             },
    //             {
    //                 name: 'Bandana Rajut',
    //                 parent: categories[2],
    //                 level: 1
    //             },
    //             {
    //                 name: 'Bandana Rajut Full',
    //                 parent: categories[2],
    //                 level: 1
    //             },
    //         ])
    //         .execute()
    }
}