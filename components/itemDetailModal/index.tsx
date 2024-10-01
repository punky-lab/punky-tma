import Image from "next/image";

interface ItemDetailModalProps {
  image: string;
  name: string;
  price: number;
  owned: boolean;
  onClose: () => void;
}

export default function ItemDetailModal({
  image,
  name,
  price,
  owned,
  onClose,
}: ItemDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div
        className="bg-gradient-to-br bg-opacity-10 rounded-lg p-6 max-w-sm w-2/3 shadow-lg"
        style={{
          background:
            "linear-gradient(90deg, rgba(58, 46, 81, 1), rgba(85, 70, 100, 1))",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <button
            onClick={onClose}
            className="text-gray-200 hover:text-gray-300"
          >
            &times;
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <Image
            src={image}
            alt={name}
            width={150}
            height={150}
            className="rounded-md"
          />
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="text-lg text-gray-200 mr-2 mb-2">💰</span>
          <p className="text-lg mb-0 text-gray-200">{price}</p>
        </div>
        <div className="flex justify-center">
          {owned ? (
            <button className="w-full bg-gradient-to-br from-purple-300 to-purple-900 text-white py-2 rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition-colors">
              Equip
            </button>
          ) : (
            <button className="w-full bg-gradient-to-br from-purple-300 to-purple-900 text-white py-2 rounded-lg hover:from-pink-600 hover:to-red-600 transition-colors">
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
