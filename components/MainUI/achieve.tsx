import PopUp from "./PopUp";
import { useEffect, useState } from "react";
import { TraitMetadata } from "@/lib/traits";
import { getTraitMetadata } from "@/app/api/traits";
import TaskItem from "./achieveItem";
import LoadingAnimation from "@/components/loadingAnimation";

export default function Achieve({ onClose }: { onClose: () => void }) {
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
    <PopUp title="Achieve" onClose={onClose}>
      <div className="w-full h-full relative">
        {dataLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingAnimation text="loading" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 px-6 pb-10 overflow-auto">
            {metadata.map((data, index) => (
              <TaskItem
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
