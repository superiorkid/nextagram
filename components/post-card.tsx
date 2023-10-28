import { Prisma, User } from "@prisma/client";
import Image from "next/image";
import { GoKebabHorizontal } from "react-icons/go";
import ActionButtons from "./action-buttons";
import Caption from "./caption";
import CommentForm from "./comment-form";
import ImageSlider from "./image-slider";
import PostDetailModal from "./post-detail-modal";
import fromNow from "@/lib/date-from-now";
import Link from "next/link";
import UserTooltip from "@/components/user-tooltip";

interface Props {
  currentUser: User | null;
  post: Prisma.PostGetPayload<{
    include: {
      images: true;
      author: {
        include: {
          posts: {
            include: {
              images: true;
            };
          };
          followers: true;
          following: true;
          _count: {
            select: {
              posts: true;
              followers: true;
              following: true;
            };
          };
        };
      };
      likedByUsers: true;
      commentedByUsers: {
        include: {
          user: true;
          commentLikes: true;
          _count: {
            select: {
              commentLikes: true;
            };
          };
        };
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
        <UserTooltip
          user={
            post.author as Prisma.UserGetPayload<{
              include: {
                posts: {
                  include: {
                    images: true;
                  };
                };
                followers: true;
                following: true;
                _count: {
                  select: {
                    posts: true;
                    followers: true;
                    following: true;
                  };
                };
              };
            }>
          }
        >
          <div className="flex items-center space-x-3">
            <div className="relative h-9 w-9">
              <Image
                fill
                src={
                  post.author?.image ??
                  `https://api.dicebear.com/7.x/micah/png?seed=${post.author?.email}`
                }
                alt={`${post.author?.name} image`}
                className="rounded-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75}
              />
            </div>
            <div className="leading-tight">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-bold tracking-wide">
                  <Link href={`/${post.author?.name}`}>
                    {post.author?.name}
                  </Link>{" "}
                  <span className="text-gray-400 text-xs">
                    • {fromNow(post.createdAt)}
                  </span>
                </p>
              </div>
              {post.location && (
                <p className="text-xs text-gray-600 font-light tracking-wide dark:text-gray-400">
                  {post.location}
                </p>
              )}
            </div>
          </div>
        </UserTooltip>
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
        <PostDetailModal currentUser={currentUser} post={post}>
          <button className="block text-gray-500 outline-none">
            {post._count.commentedByUsers < 1
              ? "View Post"
              : post._count.commentedByUsers === 1
              ? "View Comment"
              : `View all ${post._count.commentedByUsers} comments`}
          </button>
        </PostDetailModal>
        <CommentForm postId={post.id} />
      </div>
    </div>
  );
};

export default PostCard;
