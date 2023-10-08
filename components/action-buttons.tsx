import { LuMessageCircle } from "react-icons/lu";
import {
  LiaHeart,
  LiaTelegram,
  LiaBookmark,
  LiaHeartSolid,
} from "react-icons/lia";
import { Likes, User } from "@prisma/client";

interface Props {
  currentUser: User | null;
  likes: Likes[];
}

const ActionButtons = ({ currentUser, likes }: Props) => {
  return (
    <div className="flex items-center justify-between my-2">
      <div className="flex space-x-3.5">
        <button aria-label="like action" className="hover:text-gray-500">
          {likes.find((obj) => obj["userId"].includes(currentUser?.id!)) ? (
            <LiaHeartSolid className="w-7 h-7 fill-rose-500 hover:fill-rose-600 transition-all duration-400" />
          ) : (
            <LiaHeart className="w-7 h-7" />
          )}
        </button>
        <button aria-label="comment action" className="hover:text-gray-500">
          <LuMessageCircle className="w-7 h-7" />
        </button>
        <button aria-label="share action" className="hover:text-gray-500">
          <LiaTelegram className="w-7 h-7" />
        </button>
      </div>
      <button aria-label="bookmark action" className="hover:text-gray-500">
        <LiaBookmark className="w-7 h-7" />
      </button>
    </div>
  );
};

export default ActionButtons;
