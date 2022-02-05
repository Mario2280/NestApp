import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly order: number;

    @IsNotEmpty()
    readonly description: string;

    readonly userId: string;

    readonly columnId: string;

    @IsNotEmpty()
    readonly boardId: string;


}
