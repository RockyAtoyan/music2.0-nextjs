import { IPlaylist } from "@/lib/types/IPlaylist";
import { ISong } from "@/lib/types/ISong";
import { IListen } from "@/lib/types/IListen";
import { INotification } from "@/lib/types/INotification";

export interface IUser {
  id: string;
  login: string;
  password: string;
  image: string;
  favs: string[];
  playlists: IPlaylist[];
  songs: ISong[];
  lasts: IListen[];
  subscribs: Array<{ subscribed: IUser }>;
  // subscribers Follow[] @relation("subsribe")
  notifications: INotification[];
}
