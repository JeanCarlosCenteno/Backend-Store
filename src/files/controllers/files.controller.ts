import { Controller, Post } from '@nestjs/common';
import { FilesService } from '../services/files.service';

@Controller('Files')
export class FilesController {
    constructor(
        private readonly FilesService: FilesService) {}

    @Post('product')
    UploadImage() {
        return 'Hola Jean';
    }
}