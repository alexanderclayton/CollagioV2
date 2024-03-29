import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";

interface IImageArrayProps {
  imageUrl: string;
}

export const ImageArray = ({ imageUrl }: IImageArrayProps) => {
  return (
    <Draggable handle=".drag-handle">
      <ResizableBox
        width={200}
        height={200}
        minConstraints={[50, 50]}
        maxConstraints={[600, 600]}
      >
        <div>
          <div
            className="drag-handle"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50px",
              cursor: "move",
            }}
          />
          <img
            src={imageUrl}
            style={{ width: "100%", height: "100%" }}
            alt="user upload"
          />
          <div style={{ position: "absolute", top: 0, right: 0 }}></div>
        </div>
      </ResizableBox>
    </Draggable>
  );
};
