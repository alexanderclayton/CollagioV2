import { useQuery } from "@apollo/client";
import html2canvas from "html2canvas";
import { useState } from "react";
import { GET_AVATAR, GET_IMAGES } from "../utils/queries";
import { UserProfile } from "../components/UserProfile";
import { EditProfile } from "../components/EditProfile";
import { ImageArray } from "../components/ImageArray";

export const Home = () => {
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleScreenshot = () => {
    // useRef for this instead? //
    const profile = document.getElementById("profile");
    if (profile instanceof HTMLElement) {
      html2canvas(profile).then((canvas) => {
        canvas.toBlob((blob) => {
          console.log(blob);
          window.print();
        });
      });
    }
  };

  const {
    loading: imagesLoading,
    error: imagesError,
    data: imagesData,
  } = useQuery(GET_IMAGES);
  const {
    loading: avatarLoading,
    error: avatarError,
    data: avatarData,
  } = useQuery(GET_AVATAR);

  if (imagesLoading || avatarLoading) return <p>Loading...</p>;
  if (imagesError || avatarError) return <p>Error fetching data...</p>;

  return (
    <main>
      <div id="main-page" style={{ display: isEditing ? "none" : "block" }}>
        <UserProfile
          name={name}
          username={username}
          bio={bio}
          avatarUrl={avatarData.getAvatar}
          setIsEditing={setIsEditing}
          handleScreenshot={handleScreenshot}
        />
      </div>
      <div style={{ display: isEditing ? "block" : "none" }}>
        <EditProfile
          name={name}
          setName={setName}
          username={username}
          setUsername={setUsername}
          bio={bio}
          setBio={setBio}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
      <div id="profile" style={{ display: isEditing ? "none" : "block" }}>
        {imagesData.getImages.map((imageUrl: string) => (
          <ImageArray imageUrl={imageUrl} />
        ))}
      </div>
    </main>
  );
};
