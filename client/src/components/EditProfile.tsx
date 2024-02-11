import { UploadAvatar } from "./UploadAvatar";

interface IEditProfileProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
  onCancel: () => void;
}

export const EditProfile = ({
  name,
  setName,
  username,
  setUsername,
  bio,
  setBio,
  onSave,
  onCancel,
}: IEditProfileProps) => {
  return (
    <div>
      <UploadAvatar />
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="bio">Bio:</label>
      <textarea
        id="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        cols={30}
        rows={10}
      ></textarea>
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
