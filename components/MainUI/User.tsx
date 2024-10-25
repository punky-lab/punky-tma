import PopUp from "./PopUp";
import Image from "next/image"; // 导入 Image 组件
import DEFAULT_AVATAR from "@/assets/ui/avatar.jpg";
import AvatarBackground from "@/assets/ui/avatar.svg"

const DEFAULT_NAME = "xiang nuan"; // 默认用户名
const DEFAULE_ISONLINE = "online";
const DEFAILT_CONTACT = "xiangnuan@gmail.com";
const DEFAULT_BIO =
  "This is the user&apos;s bio, where you can add more information.";

interface UserProps {
  onClose: () => void;
  userName?: string; // 用户名
  userAvatar?: string; // 用户头像 URL
  isOnline?: string; // 是否在线
  contact?: string; // 联系方式
  bio?: string; // 简介
}

export default function User({
  onClose,
  userName = DEFAULT_NAME,
  userAvatar = DEFAULT_AVATAR.src,
  isOnline = DEFAULE_ISONLINE,
  contact = DEFAILT_CONTACT,
  bio = DEFAULT_BIO,
}: UserProps) {
  return (
    <PopUp title="Profile" onClose={onClose}>
      <div className="w-full rounded-lg">
        <div className="flex flex-row justify-center items-center">
          <Image src={AvatarBackground} alt="avatar"></Image>
        </div>
        {/* <div className="flex items-center mb-6 px-4"> */}
        {/* <Image
            src={userAvatar}
            alt={`${userName}'s avatar`}
            className="w-16 h-16 rounded-full border-2 border-white mr-4"
            width={64}
            height={64}
          /> */}
        {/* <div className="px-4">
            <p className="text-xs text-white">{userName}</p>
            <p className="text-green-300 font-medium text-sm">{isOnline}</p>
          </div>
        </div> */}
        <div className="text-xs leading-relaxed text-white px-4">
          <p className="font-semibold text-sm">Contact:</p>
          <p className="text-gray-200">{contact}</p>
          <p className="font-semibold text-sm mt-4">Bio:</p>
          <p className="text-gray-200">{bio}</p>
        </div>
      </div>
    </PopUp >
  );
}
