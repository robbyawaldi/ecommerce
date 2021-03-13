import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { Image } from "../entities/Image";
import { MyContext, Upload } from "../types";
import { getImageUrl } from "../utils/getImagesUrl";
import { renameFile } from "../utils/renameFile";

@ObjectType()
class ImageUploadResponse {
    @Field(() => Boolean)
    uploaded: boolean;
    @Field(() => String, { nullable: true })
    url?: string;
    @Field(() => String, { nullable: true })
    image?: string;
}

@Resolver(Image)
export class ImageResolver {

    @Mutation(() => ImageUploadResponse)
    async uploadImage(
        @Ctx() { req }: MyContext,
        @Arg("file", () => GraphQLUpload) { createReadStream, filename }: Upload
    ): Promise<ImageUploadResponse> {

        const fileName = renameFile(filename)

        return new Promise(async (resolver) =>
            createReadStream()
                .pipe(
                    createWriteStream(
                        __dirname + `/../../public/images/${fileName}`
                        , { autoClose: true }
                    )
                )
                .on('finish', () => resolver({
                    uploaded: true,
                    url: getImageUrl(fileName, req),
                    image: fileName
                }))
                .on("error", () => resolver({
                    uploaded: false
                }))
        )
    }

    @Mutation(() => Boolean)
    async deleteImage(
        @Arg("id", () => String) id: string
    ): Promise<boolean> {
        await Image.delete(id)
        return true
    }
}