import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum Status {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  UNKNOWN = 'UNKNOWN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

registerEnumType(Status, { name: 'Status' });
registerEnumType(Gender, { name: 'Gender' });

@ObjectType()
export class Character {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Gender)
  gender: Gender;

  @Field()
  description: string;
}
