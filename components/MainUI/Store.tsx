export default function Store({ onClose }: { onClose: () => void }) {
  return (
    <div>
      <div onClick={onClose}>close</div>
      <div>store</div>
    </div>
  );
}
