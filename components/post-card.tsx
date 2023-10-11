import { Prisma, User } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import { GoKebabHorizontal } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import ActionButtons from "./action-buttons";
import Caption from "./caption";
import CommentForm from "./comment-form";
import ImageSlider from "./image-slider";
import PostDetailModal from "./post-detail-modal";

interface Props {
  currentUser: User | null;
  post: Prisma.PostGetPayload<{
    include: {
      images: true;
      author: true;
      likedByUsers: true;
      commentedByUsers: {
        include: { user: true };
      };
      _count: {
        select: { likedByUsers: true; commentedByUsers: true };
      };
    };
  }>;
}

const PostCard = async ({ post, currentUser }: Props) => {
  return (
    <div className="min-h-[68dvh] flex flex-col justify-between pt-3.5 first:pt-0">
      {/* head */}
      <div className="flex justify-between items-center mb-3 px-2 md:px-0">
        <div className="flex items-center space-x-3">
          <div className="relative h-9 w-9">
            {post.author?.image ? (
              <Image
                fill
                src={post.author?.image}
                alt="profile pic"
                className="rounded-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <RxAvatar className="w-9 h-9 inline-flex mr-2.5" />
            )}
          </div>
          <div className="leading-tight">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-bold tracking-wide">
                {post.author?.name}{" "}
                <span className="text-gray-400 text-xs">
                  •{" "}
                  {moment(
                    new Date(Date.parse(post.createdAt.toString()))
                  ).fromNow()}
                </span>
              </p>
            </div>
            {post.location && (
              <p className="text-xs text-gray-600 font-light tracking-wide">
                {post.location}
              </p>
            )}
          </div>
        </div>
        <button
          aria-label="more action button"
          type="button"
          aria-labelledby="more action button"
        >
          <GoKebabHorizontal />
          <span className="sr-only">more button</span>
        </button>
      </div>

      {/* content */}
      <div className="flex-1 overflow-auto">
        <ImageSlider images={post.images} />
        <div className="text-sm px-2 md:px-0">
          <ActionButtons
            postId={post.id}
            currentUser={currentUser}
            likes={post.likedByUsers}
            iconSize="7"
          />
          <div className="space-y-0.5">
            <p className="font-bold tracking-wide">
              {post._count.likedByUsers} likes
            </p>
            <Caption name={post.author?.name!} caption={post.caption} />
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="mt-1 text-sm space-y-1 px-2 md:px-0">
        <PostDetailModal currentUser={currentUser} post={post} />
        <CommentForm />
      </div>
    </div>
  );
};

export default PostCard;
