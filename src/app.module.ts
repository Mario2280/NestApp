import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';





@Module({
    controllers: [],
    providers: [],
    imports: [ConfigModule.forRoot({
        envFilePath: '.env'
    })
        , TypeOrmModule.forRoot(), TaskModule, UserModule, BoardModule]
})
export class AppModule { }
