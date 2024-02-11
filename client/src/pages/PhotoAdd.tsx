import { useState } from "react";
import { useFileUpload } from "../utils/firebase";
import { Avatar } from "antd";

export const PhotoAdd = () => {
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(
    undefined
  );
  const { fileUpload } = useFileUpload();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!photo) {
      return;
    } else {
      fileUpload(photo);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "/home";
  };

  return (
    <>
      <div>
        <h1>Add your photo here:</h1>
        {photoPreview ? (
          <Avatar shape="square" size={104} src={photoPreview} />
        ) : (
          <Avatar shape="square" size={104} />
        )}
      </div>
      <input
        type="file"
        id="selected-photo"
        name="selected-photo"
        onChange={handlePhotoChange}
      />
      <br />
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
      <br />
      <button onClick={handleCancel} type="submit">
        Cancel
      </button>
      <br />
    </>
  );
};
