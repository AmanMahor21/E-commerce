
import 'reflect-metadata';
import { IsNotEmpty , MaxLength, ValidateIf } from 'class-validator';

export class CreateCurrency {

    @MaxLength(30, {
        message: 'title should be maximum 30 characters',
    })
    @IsNotEmpty()
    public title: string;

    @MaxLength(4, {
        message: 'code should be maximum 4 characters',
    })
    public code: string;
    @MaxLength(4, {
        message: 'symbolLeft should be maximum 4 characters',
    })
    @ValidateIf(o => o.symbolLeft !== null)
    public symbolLeft: string;
    @MaxLength(4, {
        message: 'symbolRight should be maximum 4 characters',
    })
    @ValidateIf(o => o.symbolRight !== null)
    public symbolRight: string;

    @IsNotEmpty()
    public status: number;
}
