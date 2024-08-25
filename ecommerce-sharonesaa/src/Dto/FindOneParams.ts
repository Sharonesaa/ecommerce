import { IsUUID } from 'class-validator';

export class FindOneParams {
  @IsUUID()
  id: string;
}

export class FindUserParams {
    @IsUUID()
    userId: string;
  }
