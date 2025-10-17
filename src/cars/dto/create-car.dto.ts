import { IsString } from "class-validator";

export class CreateCarDto
{
    @IsString({message:'debes especificar string'})
    readonly brand:string;

    @IsString()
    readonly model:string;
}