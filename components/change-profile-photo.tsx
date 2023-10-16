import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ChangeProfilePhoto() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sky-500 font-bold text-sm">
          Change profile photo
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md text-center flex flex-col space-y-0 p-0 m-0">
        <div>
          <h1 className="border-b py-5 text-xl">Change Profile Photo</h1>
          <button className="border-b rounded-md w-full capitalize py-3 text-sm text-sky-500 font-bold tracking-wide">
            upload photo
          </button>
          <button className="border-b rounded-md w-full capitalize py-3 text-sm text-rose-500 font-bold tracking-wide">
            remove current photo
          </button>
          <button className="capitalize py-3">cancel</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeProfilePhoto;
