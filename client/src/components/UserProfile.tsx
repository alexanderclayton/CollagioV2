import { Avatar } from "antd";

interface IUserProfileProps {
  name: string;
  username: string;
  bio: string;
  avatarUrl: any;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleScreenshot: () => void;
}

export const UserProfile = ({
  name,
  username,
  bio,
  avatarUrl,
  setIsEditing,
  handleScreenshot,
}: IUserProfileProps) => {
  return (
    <>
      <Avatar size={104} src={avatarUrl} />
      <h2>{name}</h2>
      <p>@{username}</p>
      <p>{bio}</p>
      <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      <button onClick={handleScreenshot}>Print Collagio</button>
    </>
  );
};
