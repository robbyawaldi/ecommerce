import { InputType, Field, Int } from "type-graphql";
import { Color } from "../entities/Color";
import { Image } from "../types";
import { ColorInput } from "./ColorInput";
import { ImageInput } from "./ImageInput";
@InputType()
export class ProductInput {
    @Field({ nullable: true })
    title: string;
    @Field({ nullable: true })
    description: string;
    @Field({ nullable: true })
    detail: string;
    @Field(() => Int, { nullable: true })
    price: number;
    @Field(() => Int, { nullable: true })
    discount: number;
    @Field(() => Boolean, { nullable: true })
    stockAvailable: boolean;
    @Field(() => Boolean, { nullable: true })
    isPublish: boolean;
    @Field(() => Boolean, { nullable: true })
    isExclusive: boolean;
    @Field(() => Boolean, { nullable: true })
    isDiscount: boolean;
    @Field(() => Boolean, { nullable: true })
    isMalikha: boolean;
    @Field(() => [ImageInput], { nullable: true })
    images: Image[];
    @Field(() => [ColorInput], { nullable: true })
    colors: Color[];
    @Field(() => [Int], { nullable: true })
    categories: number[];
    @Field(() => [Int], { nullable: true })
    sizes: number[];
}
