import PopUp from "./PopUp";

export default function User({ onClose }: { onClose: () => void }) {
  return (
    <PopUp onClose={onClose}>
      <p>user</p>
    </PopUp>
  );
}
