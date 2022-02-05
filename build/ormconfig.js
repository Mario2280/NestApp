"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'postgres',
    entities: [__dirname + '/build/*.entity.js'],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    migrations: [__dirname + '/build/migration/*.js']
};
exports.default = config;
