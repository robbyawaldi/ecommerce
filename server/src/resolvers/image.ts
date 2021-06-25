import { GraphQLUpload } from "graphql-upload";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { Image } from "../entities/Image";
import { Upload } from "../types";
import { renameFile } from "../utils/renameFile";
import aws from 'aws-sdk'
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { getImageUrl } from "../utils/getImagesUrl";

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
        @Arg("file", () => GraphQLUpload) { filename, mimetype, createReadStream }: Upload,
    ): Promise<ImageUploadResponse> {

        filename = renameFile(filename)

        const s3 = new aws.S3({
            endpoint: new aws.Endpoint(process.env.S3_ENDPOINT),
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        })

        const s3Params: PutObjectRequest = {
            Bucket: process.env.S3_BUCKET,
            Key: 'products/' + filename,
            ContentType: mimetype,
            ACL: 'public-read',
            Body: createReadStream()
        };

        try {
            s3.upload(s3Params, function (err, _) {
                console.log(err)
            })
            return {
                uploaded: true,
                url: getImageUrl(filename),
                image: filename,
            }
        } catch (err) {
            return {
                uploaded: false
            }
        }
    }

    @Mutation(() => Boolean)
    async deleteImage(
        @Arg("id", () => String) id: string
    ): Promise<boolean> {
        await Image.delete(id)
        return true
    }
}