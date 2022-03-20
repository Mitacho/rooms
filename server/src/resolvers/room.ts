import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Room } from "../entities";
import { SendMessageInput } from "../inputs";
import genRandomId from "../utils/genRandomId";

export const rooms: Array<Room> = [
  {
    slug: "ubuntu",
    discussion: "Ubuntu 21.10",
    description: "Awesome features of the latest version of Ubuntu Linux",
    members: [],
    messages: [
      {
        id: genRandomId(),
        from: {
          name: undefined,
          login: "Mitacho",
          avatarUrl:
            "https://avatars.githubusercontent.com/u/50084167?u=5103a4d96096e144b75a43910688e2a907978966&v=4",
          bio: "hajimemashite",
        },
        message: "Olá mundo!",
        time: new Date("2022 3 11"),
        to: "ubuntu",
      },
      {
        id: genRandomId(),
        from: {
          login: "benawad",
          avatarUrl: "https://avatars.githubusercontent.com/u/7872329?v=4",
          bio: "hajimemashite",
          name: "Ben Awad",
        },
        message: "hajimemashite",
        time: new Date(),
        to: "ubuntu",
      },
    ],
  },
  {
    slug: "reversing",
    discussion: "Reversing",
    description: "Secrets of Reverse Engineering",
    members: [],
    messages: [],
  },
];

@Resolver()
export class RoomResolver {
  @Query(() => [Room])
  rooms(): Array<Room> {
    return rooms;
  }

  @Query(() => Room, { nullable: true })
  room(
    @Arg("slug", () => String, { nullable: true }) slug: Room["slug"]
  ): Room | null | undefined {
    return rooms.find((room) => room.slug === slug) || null;
  }

  @Mutation(() => Boolean)
  sendMessage(
    @Arg("options", () => SendMessageInput) options: SendMessageInput
  ) {
    const room = rooms.find((room) => room.slug === options.to);

    if (!room) return false;

    console.log(room);
    console.log(options.from);

    return true;
  }
}
