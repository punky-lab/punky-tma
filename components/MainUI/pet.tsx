import petFrames from "@/assets/animations/punky/idle";
import Animation from "../Animation";

export default function PetPlayer() {
  return <Animation frames={petFrames} interval={1000} width={128} height={128} />;
}
