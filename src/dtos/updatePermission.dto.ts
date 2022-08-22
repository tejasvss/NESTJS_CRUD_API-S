import { IsNotEmpty } from "class-validator";

export class UpdatePermissionDto {

    @IsNotEmpty()
    permission_name: string;

    @IsNotEmpty()
    permission_description: string;

}