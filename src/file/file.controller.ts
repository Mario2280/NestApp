/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import {Response} from 'express';
import { Controller, Get, NotFoundException, Param, Post, Res, ServiceUnavailableException, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
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
    
    
    @Get('/:filename')
  async downloadMedia(@Param('mediaId') mediaId: string, @Res() res: Response) {
    let storageFile: StorageFile;
    try {
      storageFile = await this.storageService.get('media/' + mediaId);
    } catch (e) {
      if ((<Error>e).message.toString().includes('No such object')) {
        throw new NotFoundException('image not found');
      } else {
        throw new ServiceUnavailableException('internal error');
      }
    }
    res.setHeader('Content-Type', storageFile.contentType);
    res.setHeader('Cache-Control', 'max-age=60d');
    res.end(storageFile.buffer);
  }
}



