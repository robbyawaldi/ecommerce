import { ArgsType, Field, Int, registerEnumType } from "type-graphql";

enum Sort {
    ASC = "ASC",
    DESC = "DESC"
}

registerEnumType(Sort, {
    name: "Sort"
});

@ArgsType()
export class FilterProduct {
    @Field(() => Int,{ nullable: true })
    categoryId: number;
    @Field({ nullable: true })
    isExclusive: boolean;
    @Field({ nullable: true })
    isDiscount: boolean;
    @Field(() => Sort, { nullable: true })
    sortByName: Sort | undefined
    @Field(() => Sort, { nullable: true })
    sortByPrice: Sort | undefined
    @Field({ nullable: true })
    isAdmin: boolean;
    @Field({ nullable: true })
    search: string
}