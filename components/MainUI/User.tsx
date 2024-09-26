import PopUp from "./PopUp";
import Image from "next/image"; // 导入 Image 组件
import DEFAULT_AVATAR from "@/assets/ui/avatar.jpg";

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
    <PopUp title="Account" onClose={onClose}>
      <div className="p-6 rounded-lg">
        <div className="flex items-center mb-6">
          <Image
            src={userAvatar}
            alt={`${userName}'s avatar`}
            className="w-16 h-16 rounded-full border-2 border-white mr-4"
            width={64}
            height={64}
          />
          <div>
            <p className="text-lg text-white">{userName}</p>
            <p className="text-green-300 font-medium text-sm">{isOnline}</p>
          </div>
        </div>
        <div className="text-sm leading-relaxed text-white">
          <p className="font-semibold text-lg">Contact:</p>
          <p className="text-gray-200">{contact}</p>
          <p className="font-semibold text-lg mt-4">Bio:</p>
          <p className="text-gray-200">{bio}</p>
        </div>
      </div>
    </PopUp>
  );
}
