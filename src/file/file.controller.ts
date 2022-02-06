/* eslint-disable no-useless-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Controller, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post(':filename')
    @UseInterceptors(FileInterceptor('file',
      {
        storage: diskStorage({
          destination: './files', 
          filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${req.params.filename}${extname(file.originalname)}`)
        }
        })
      }
    )
    )
    uploadAvatar(@Param('filename') filename:any, @UploadedFile() file:any) {
      return 'Uploaded';
    }     
}



