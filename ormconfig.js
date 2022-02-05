
module.exports =  {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: '123456',
    dropSchema: false,
    cache: false,
    database: "postgres",
    entities: [
        "build/**/*.entity.js"
    ],
    migrations: [
        "build/**/migration/*.js"
    ],
    synchronize: false,
    migrationsRun: true
};