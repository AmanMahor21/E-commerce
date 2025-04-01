import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
export class DeleteService {

    @IsNotEmpty()
    public serviceId: [];
}
