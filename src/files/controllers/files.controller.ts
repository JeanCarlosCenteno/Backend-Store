import { Controller, Post, UseInterceptors, UploadedFile,BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from 'src/helpers/fileFilter.helper';
import { FilesService } from '../services/files.service';
import { fileNamer } from '../../helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        //Llamamos al fileFilter de muter y le asignamos nuestro helper
        fileFilter: fileFilter,

        //Definimos el almacenamiento donde se va aguardar y lo renombramos
        storage: diskStorage({
            destination: './static/products/',
            filename: fileNamer,
        })
    }))
    uploadImage(@UploadedFile() file: Express.Multer.File){
        if(!file) {
            throw new BadRequestException('Asegurese que el archivo sea una imagen');
        }
        return {
            fileName: file.filename,
        };
    }
}