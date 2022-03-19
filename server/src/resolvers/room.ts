import { Query, Resolver } from "type-graphql";
import { Room } from "../entities";

const rooms: Array<Room> = [
  {
    slug: "ubuntu",
    discussion: "Ubuntu 21.10",
    description: "Awesome features of the latest version of Ubuntu Linux",
    members: [],
  },
  {
    slug: "reversing",
    discussion: "Reversing",
    description: "Secrets of Reverse Engineering",
    members: [],
  },
];

@Resolver()
export class RoomResolver {
  @Query(() => [Room])
  rooms(): Array<Room> {
    return rooms;
  }
}
