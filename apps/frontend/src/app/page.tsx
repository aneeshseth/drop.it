"use client";
import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/Spotlight";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const words = [
    {
      text: "drop.it",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="min-h-screen flex justify-center items-center bg-black bg-opacity-96 antialiased">
      <div className="absolute top-10 left-10 flex">
        <img
          src="https://code.google.com/images/developers.png"
          className="max-w-20 max-h-20 mr-3"
        />
        <h1 className="md:text-6xl text-5xl lg:text-6xl font-bold mt-5">
          drop.it
        </h1>
      </div>
      <div className="absolute top-10 right-2 mt-1" style={{ zIndex: "20" }}>
        <Button
          variant={"link"}
          className="text-white mt-5 text-xl underline"
          onClick={() => {
            window.open("https://github.com/aneeshseth/drop.it", "_blank");
          }}
        >
          code.
        </Button>
      </div>
      <Spotlight className="-top-40 left-0 md:left-60 absolute" fill="blue" />
      <div className="p-4 max-w-7xl z-10 w-full pt-20 text-center text-white -mt-7 ">
        <h1 className="scroll-m-20 text-2xl tracking-tight lg:text-5xl md:mt-44 lg:mt-44 mt-32 font-serif sm:mt-36">
          <span className="text-blue-500">open source</span> sandbox for writing
          codebases in the browser.
        </h1>
        <div style={{ zIndex: 20, position: "relative" }}>
          <Button
            variant={"link"}
            className="text-white mt-5 text-lg underline"
            onClick={() => {
              signIn("github", { callbackUrl: "/dashboard" });
            }}
          >
            start writing code.
          </Button>
          <Button
            variant={"link"}
            className="text-white mt-5 text-lg underline"
            onClick={() => {
              router.push("/docs");
            }}
          >
            design implementation.
          </Button>
        </div>
        <div className="mt-10 flex justify-center items-center w-full px-4">
          <img
            src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1708830652/Screen_Shot_2024-02-24_at_7.10.01_PM_oxwvhy.png"
            width={700}
            height={460}
            className="rounded-xl border-2 border-slate-500"
            alt="Descriptive Alt Text"
          />
        </div>
        <h1 className="text-xl tracking-tight lg:text-xl lg:mt-20 mt-20 font-serif">
          built by <span className="text-red-500">aneesh.seth@sjsu.edu</span>
        </h1>
      </div>
    </div>
  );
}
