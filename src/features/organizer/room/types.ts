export interface RoomApiResponse {
  id: number;
  name: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: number;
  name: string;
  capacity: number;
}

export interface RoomFormProps {
  name: string;
  capacity: number;
}
