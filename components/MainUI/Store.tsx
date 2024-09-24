import PopUp from "./PopUp";
import { useEffect, useState } from "react";
import { TraitMetadata } from "@/lib/traits";
import { getTraitMetadata } from "@/app/api/traits";
import StoreItem from "@/components/MainUI/storeItem";

export default function Store({ onClose }: { onClose: () => void }) {
  const [metadata, setMetadata] = useState<TraitMetadata[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  useEffect(() => {
    setDataLoading(true);
    getTraitMetadata().then((res) => {
      setMetadata(res);
      setDataLoading(false);
    });
  }, []);

  if (dataLoading) {
    return (
      <PopUp onClose={onClose}>
        <p>Loading</p>
      </PopUp>
    );
  }

  return (
    <PopUp title="Store" onClose={onClose}>
      <div className="w-full h-full relative">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 px-4 py-4 overflow-auto">
          {metadata.map((data, index) => (
            <StoreItem
              key={index}
              image={data.image}
              name={data.name}
              owned={false}
            />
          ))}
        </div>
      </div>
    </PopUp>
  );
}
