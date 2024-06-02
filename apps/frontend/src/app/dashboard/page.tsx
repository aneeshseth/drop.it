import { getServerSession } from "next-auth";
import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Tiles from "@/components/ui/tiles";
import { Button } from "@/components/ui/button";

export default async function page() {
  const data = await getServerSession(options);

  if (!data) redirect("/");

 return (
  <div>
    <div className="mt-11 ml-5 hidden md:block">
      Welcome <div className="inline text-lime-600">{data.user?.name}.</div>
    </div>

      <div className="flex justify-center h-screen items-center">
        <video
          src="https://res.cloudinary.com/dysiv1c2j/video/upload/v1709384508/0302_aepd6i.mov"
          autoPlay
          controls
          className="w-4/6 rounded-xl"
        />
      </div>
  </div>
);

}
