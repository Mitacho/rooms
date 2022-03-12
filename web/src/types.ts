export type Person = {
  name: string;
  username: string;
  image: string;
  isOnline?: boolean;
};

export type People = Array<Person>;

export type Room = {
  id: string;
  discussion: string;
  description: string;
  users: number;
};

export type RoomList = Array<Room>;
