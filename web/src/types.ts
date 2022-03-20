export type Person = {
  id: string;
  self: boolean;
  name?: string;
  login: string;
  avatarUrl?: string;
  bio?: string;
};

export type People = Array<Person>;

export type Room = {
  slug: string;
  discussion: string;
  description: string;
  members: People;
};

export type RoomList = Array<Room>;

export type Message = {
  from: Person;
  message: string;
  time: Date;
};
