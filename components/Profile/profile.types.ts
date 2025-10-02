export interface ProfileProps {
  avatar?: string;
  name: string;
  username: string;
  country: string;
  followers: number;
  url: string;
  last_online: number;
  joined: number;
  title: string;
  league: string;
  location: string;
  is_streamer: boolean;
  verified: boolean;
  status: string;
}
export interface ProfileComponentProps {
  username: string;
  profileData: ProfileProps | null;
}
