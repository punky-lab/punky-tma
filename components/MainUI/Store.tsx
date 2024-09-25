import PopUp from "./PopUp";
import { useEffect, useState } from "react";
import { TraitMetadata } from "@/lib/traits";
import { getTraitMetadata } from "@/app/api/traits";
import StoreItem from "@/components/MainUI/storeItem";
import LoadingAnimation from "@/components/loadingAnimation"; // 确保导入 LoadingAnimation 组件

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
      <div className="w-full h-full relative">
        {dataLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingAnimation text="loading" />
          </div>
        ) : (
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
        )}
      </div>
    </PopUp>
  );
}
