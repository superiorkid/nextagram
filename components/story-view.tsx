import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import fromNow from "@/lib/date-from-now";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface Props {
  story: Prisma.StoriesGetPayload<{
    include: {
      author: true;
    };
  }>;
}

const StoryView = ({ story }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-14 h-14">
            <Image
              fill
              src={
                story.author.image ??
                `https://api.dicebear.com/7.x/micah/png?seed=${story.author.email}`
              }
              alt={`${story.author.name} profile photo`}
              className="object-cover rounded-full ring-2 ring-pink-500 ring-offset-2 self-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <p className="text-xs">{story.author.name}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="min-h-[95dvh] max-w-[25dvw] p-0">
        <div className="relative">
          <Image
            fill
            src={story.media_url}
            alt={`${story.author.name} story`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover brightness-90"
            priority
          />

          {/* header */}
          <div className="absolute top-5 left-4 flex items-center space-x-2.5">
            <div className="relative w-10 h-10">
              <Image
                fill
                alt={`${story.author.name} profile picture`}
                src={
                  story.author.image ??
                  `https://api.dicebear.com/7.x/micah/png?seed=${story.author.email}`
                }
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-full"
              />
            </div>
            <div className="text-sm font-light flex items-center space-x-3">
              <h4 className="text-white tracking-wide">{story.author.name}</h4>
              <span className="text-white opacity-75">
                {fromNow(story.postedAt.toString())}
              </span>
            </div>
          </div>

          {/* footer or caption section */}
          <div className="absolute bottom-0 left-0 h-1/6 w-full bg-opacity-30 bg-black items-center flex">
            <p className="text-gray-100 w-2/3 mx-auto text-center">
              {story.caption}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryView;
