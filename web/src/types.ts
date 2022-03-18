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
  id: string;
  discussion: string;
  description: string;
  users: number;
};

export type RoomList = Array<Room>;
