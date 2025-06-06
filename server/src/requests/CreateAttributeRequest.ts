
import 'reflect-metadata';
import { IsNotEmpty, Max, MaxLength } from 'class-validator';

export class CreateAttribute {

    @IsNotEmpty({
        message: 'Attribute name is required',
    })
    @MaxLength(255, {
        message: 'attribute name should be maximum 255 characters',
    })
    public attributeName: string;

    @IsNotEmpty({
        message: 'group is required',
    })
    public groupId: number;

    @Max(9999, {
        message: 'maximum length of sort order should be 4',
    })
    @IsNotEmpty({
        message: 'sortOrder is required',
    })
    public sortOrder: number;

}
