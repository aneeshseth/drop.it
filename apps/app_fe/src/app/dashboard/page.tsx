import { getServerSession } from "next-auth";
import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Tiles from "@/components/ui/tiles";

export default async function page() {
  const data = await getServerSession(options);

  if (!data) redirect("/");

  return (
    <div>
      <div className="w-screen justify-center flex flex-col">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl mt-10 mr-5 ml-5">
          choose a starter codebase.
        </h1>
        <h1 className="text-md tracking-tight lg:text-md mr-5 ml-5 mt-2 mb-5">
          currently available with Node.js, soon in 5+ stacks.
        </h1>
      </div>
      <div className="mt-20 ml-5 hidden md:block">
        Welcome <div className="inline text-lime-600">{data.user?.name}.</div>
      </div>
      <div className="flex justify-end w-screen">
        <div>
          <img
            src={data.user?.image || ""}
            className="rounded-full mr-5 w-16 h-16 sm:-mt-10 mt-5 absolute lg:top-20 right-10 top-28"
          />
        </div>
      </div>
      <div className="-mt-10">
        <Tiles user_image={data.user?.image} />
      </div>
    </div>
  );
}
