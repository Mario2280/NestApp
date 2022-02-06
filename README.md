# RS School REST service Docker

# *Инструкция*

 Полезыные ссылки
 + [Задание](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/nestjs.md)
 + [Критерии проверки](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/cross-check/nestjs.md)
 + [Моя самопроверка](#self-test)
 + 07.02.2022	00:00 / 06.02.2022	23:59	



## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Run application with docker

```
docker compose up --build
```
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

<a id="self-test"></a>


# Самопроверка #
Ваша оценка - 130 баллов 
Отзыв по пунктам ТЗ:
Выполненные пункты:
1) Наличие в Readme.md секции с инструкцией как запустить приложение 

2) Используется user-defined bridge 

3) При возникновении ошибки контейнер перезапускается автоматически 

4) Логи и файлы базы данных хранятся в volumes, а не в контейнере 

5) Итоговый docker-образ с приложением имеет размер меньше 300 мб 

