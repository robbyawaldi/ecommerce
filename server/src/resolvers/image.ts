import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { Image } from "../entities/Image";
import { Upload } from "../types";
import { renameFile } from "../utils/renameFile";

@ObjectType()
class ImageUploadResponse {
    @Field(() => Boolean)
    uploaded: boolean;
    @Field(() => String, {nullable: true})
    filename?: string
}

@Resolver(Image)
export class ImageResolver {

    @Mutation(() => ImageUploadResponse)
    async uploadImage(
        @Arg("image", () => GraphQLUpload) { createReadStream, filename }: Upload
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
                    filename: fileName
                }))
                .on("error", () => resolver({
                    uploaded: false
                }))
        )
    }
}