import { Controller, Post, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../services/files.service';

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File){
        console.log(file);
    }

    @Get('product/:imageId')
    getImage() {
        return 'Hola';
    }
    
}