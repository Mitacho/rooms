import type { FastifyReply, FastifyRequest } from "fastify";
import type { Redis } from "ioredis";
import { Field, ObjectType } from "type-graphql";
import { User } from "./entities";

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

export type Context = {
  request: FastifyRequest;
  reply: FastifyReply;
  redis: Redis;
};
