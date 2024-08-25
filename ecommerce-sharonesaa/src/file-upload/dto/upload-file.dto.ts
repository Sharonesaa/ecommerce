export interface UploadFileDto{
    fieldname: string;
    originalname: string;
    mimetype: string;
    size: number; 
    buffer: Buffer;
}