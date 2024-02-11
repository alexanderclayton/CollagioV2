import { useState } from "react";
import { useFileUploadAvatar } from "../utils/firebase";
import { Avatar } from "antd";

export const UploadAvatar = () => {
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const { fileUpload } = useFileUploadAvatar();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!avatar) {
      return;
    } else {
      fileUpload(avatar);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {avatarPreview ? (
        <Avatar size={104} src={avatarPreview} />
      ) : (
        <Avatar size={104} />
      )}
      <label htmlFor="avatar">Choose an avatar:</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        onChange={handleFileChange}
      />
      <input type="submit" value="Upload Avatar" />
    </form>
  );
};
