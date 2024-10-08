import PopUp from "./PopUp";
import { useEffect, useState } from "react";
import { TraitMetadata } from "@/lib/traits";
import { getTraitMetadata } from "@/app/api/traits";
import StoreItem from "@/components/MainUI/storeItem";
import LoadingAnimation from "@/components/loadingAnimation";
import { div } from "framer-motion/client";

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

  return (
    <PopUp title="Store" onClose={onClose}>
      {dataLoading ? (
        <LoadingAnimation text="loading" />
      ) : (
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 px-4">
          {metadata.map((data, index) => (
            <div className="flex justify-center" key={index}>
              <StoreItem
                key={index}
                image={data.image}
                name={data.name}
                owned={false}
              />
            </div>
          ))}
        </div>
      )}
    </PopUp>
  );
}
