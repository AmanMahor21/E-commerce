
import 'reflect-metadata';
import { IsNotEmpty , MaxLength } from 'class-validator';

export class CreateEmailTemplate {

    @MaxLength(30, {
        message: 'title is maximum 30 character',
    })
    @IsNotEmpty()
    public title: string;

    @IsNotEmpty()
    @MaxLength(255, {
        message: 'subject should be maximum 255 characters',
    })
    public subject: string;

    @IsNotEmpty({
        message: 'content is required',
    })
    public content: string;

    @IsNotEmpty()
    public status: number;

    @IsNotEmpty()
    public dynamicFieldsRef: string;
}
