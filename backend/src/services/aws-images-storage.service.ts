import { randomUUID } from "node:crypto";
import path from "node:path";

import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";

import { config } from "../configs/config";
import { FileItemsTypeEnum } from "../enums/file-items-type.enum";

class AwsImagesStorageService {
    constructor(
        private readonly client = new S3Client({
            region: config.AWS_S3_REGION,
            credentials: {
                accessKeyId: config.AWS_ACCESS_KEY,
                secretAccessKey: config.AWS_SECRET_KEY,
            },
        }),
    ) {}

    public async uploadFile(
        file: UploadedFile,
        itemType: FileItemsTypeEnum,
        itemId: string,
    ): Promise<string> {
        try {
            const filePath = this.buildPath(itemType, itemId, file.name);
            await this.client.send(
                new PutObjectCommand({
                    Bucket: config.AWS_S3_BUCKET_NAME,
                    Key: filePath,
                    Body: file.data,
                    ContentType: file.mimetype,
                }),
            );
            return filePath;
        } catch (error) {
            console.error("Error upload:", error);
            throw error;
        }
    }

    public async deleteFile(filePath: string): Promise<void> {
        try {
            await this.client.send(
                new DeleteObjectCommand({
                    Bucket: config.AWS_S3_BUCKET_NAME,
                    Key: filePath,
                }),
            );
        } catch (error) {
            console.error("Error upload:", error);
            throw error;
        }
    }

    private buildPath(
        itemType: FileItemsTypeEnum,
        itemId: string,
        fileName: string,
    ): string {
        return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`;
    }
}

export const awsImagesStorageService = new AwsImagesStorageService();
