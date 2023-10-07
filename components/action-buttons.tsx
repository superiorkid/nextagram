import { LuMessageCircle } from "react-icons/lu";
import { LiaHeart, LiaTelegram, LiaBookmark } from "react-icons/lia";

const ActionButtons = () => {
  return (
    <div className="flex items-center justify-between my-2">
      <div className="flex space-x-3.5">
        <button aria-label="like action" className="hover:text-gray-500">
          <LiaHeart className="w-7 h-7" />
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