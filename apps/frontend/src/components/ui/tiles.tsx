"use client";
import React, { useEffect, CSSProperties, useState } from "react";
import { useRouter } from "next/navigation";
import { charCountState, codebaseState, userimage } from "@/app/state/state";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import RotateLoader from "react-spinners/RotateLoader";
import { createClient } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./button";

function Tiles({ user_image, ...props }: any) {
  const router = useRouter();
  const [_text, setText] = useRecoilState(codebaseState);
  const [_image, setImage] = useRecoilState(userimage);
  const count = useRecoilValue(charCountState);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const programmingJokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
    "Why don't programmers like nature? It has too many bugs.",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "Why did the programmer go to therapy? Because he had too many arrays.",
    "Why do programmers always get Christmas and Halloween mixed up? Because Oct(31) == Dec(25).",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Why did the programmer get stuck in the shower? Because the instructions said 'lather, rinse, repeat.'",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
    "Why don't programmers like nature? It has too many bugs.",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "Why did the programmer go to therapy? Because he had too many arrays.",
    "Why do programmers always get Christmas and Halloween mixed up? Because Oct(31) == Dec(25).",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Why did the programmer get stuck in the shower? Because the instructions said 'lather, rinse, repeat.'",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.",
  ];
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  useEffect(() => {
    setImage(user_image);
    setThisJoke(
      programmingJokes[Math.floor(Math.random() * programmingJokes.length)]
    );
  }, []);
  const client = "https://lyvubwpypyofljfwjamu.supabase.co"
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dnVid3B5cHlvZmxqZndqYW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNTAzNjEsImV4cCI6MjAyNDkyNjM2MX0.7f6N3BZflML4SzK61OoGoQicPQGqmMFnkxIBQONHHvg"
  function generateRandomString(length: number) {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    while (randomString.length < length) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }

    if (!randomString.match(/^[a-z]([-a-z0-9]*[a-z0-9])?$/)) {
      return generateRandomString(length);
    }

    return randomString;
  }

  const supabase = createClient(
    client,
    key
  );

  const [thisJoke, setThisJoke] = useState("");
  async function startCodebase(lang: string) {
    const slug = generateRandomString(7);
    await axios.post("http://localhost:3002/pre_init", {
      codebase_name: slug.toLowerCase(),
      language: lang,
    });
    await axios.post("http://localhost:3005/init", {
      codebase_name: slug.toLowerCase(),
      language: lang,
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/codebase/${slug.toString().toLowerCase()}`);
    }, 12000);
  }
  async function addUserToDB() {
    if (email == "")  {
      alert("enter an email.")
      return;
    }
      await supabase.from("users").insert({ email: email });
      alert("you'll be sent an email soon to get a demo!");
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen flex-col">
        <div className="mb-10">
          <RotateLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <div>
          <p className="leading-7 [&:not(:first-child)]:mt-20 ml-5 mr-5 text-center">
            Your codebase is loading, until then, here's something: {thisJoke}{" "}
            hahahahaha.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-6 md:py-8 mt-5">
      <Button  className="mr-5 w-16 h-16 sm:-mt-10 mt-5 absolute lg:top-20 right-10 top-28 bg-black" onClick={() => {
        router.push("/docs")
      }}>docs.</Button>
      <Dialog>
        <DialogTrigger asChild>
          <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br  opacity-95 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-6 cursor-pointer">
              <HelpCircleIcon className="w-12 h-12 text-white mb-4" />
              <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl mb-3">
                ReactJS + TS
              </h1>
              <img
                src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1708830652/Screen_Shot_2024-02-24_at_7.10.01_PM_oxwvhy.png"
                width={700}
                height={460}
                className="rounded-xl border-2 border-slate-600"
                alt="Descriptive Alt Text"
              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-w-[400px]">
          <DialogHeader>
            <DialogTitle>get a demo:</DialogTitle>
            <DialogDescription>
              get a demo with a react.js + ts codebase.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Pedro Duarte"
                className="col-span-3"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input
                id="username"
                placeholder="@peduarte"
                className="col-span-3"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                addUserToDB();
              }}
              variant={"link"}
            >
              get demo
            </Button>
            <Button
              variant={"link"}
              onClick={() => {
                router.push("/demo");
              }}
            >
              watch demo
            </Button>
            <Button
              onClick={() => {
                router.push("/docs");
              }}
              variant={"link"}
            >
              learn more
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br  opacity-95 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-6 cursor-pointer">
              <HelpCircleIcon className="w-12 h-12 text-white mb-4" />
              <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl mb-3 ">
                NodeJS + TS
              </h1>
              <img
                src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1708830652/Screen_Shot_2024-02-24_at_7.10.01_PM_oxwvhy.png"
                width={700}
                height={460}
                className="rounded-xl border-2 border-slate-600"
                alt="Descriptive Alt Text"
              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-w-[400px]">
          <DialogHeader>
            <DialogTitle>get a demo:</DialogTitle>
            <DialogDescription>
              get a demo with a node.js + ts codebase.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Pedro Duarte"
                className="col-span-3"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input
                id="username"
                placeholder="@peduarte"
                className="col-span-3"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                addUserToDB()
              }}
              variant={"link"}
            >
              get demo
            </Button>
            <Button
              variant={"link"}
              onClick={() => {
                router.push("/demo");
              }}
            >
              watch demo
            </Button>
            <Button
              onClick={() => {
                router.push("/docs");
              }}
              variant={"link"}
            >
              learn more
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br  opacity-95 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-6 cursor-pointer">
              <HelpCircleIcon className="w-12 h-12 text-white mb-4" />
              <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl mb-3 ">
                NodeJS
              </h1>
              <img
                src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1708830652/Screen_Shot_2024-02-24_at_7.10.01_PM_oxwvhy.png"
                width={700}
                height={460}
                className="rounded-xl border-2 border-slate-600"
                alt="Descriptive Alt Text"
              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-w-[400px]">
          <DialogHeader>
            <DialogTitle>get a demo:</DialogTitle>
            <DialogDescription>
              get a demo with a node.js codebase.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Pedro Duarte"
                className="col-span-3"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input
                id="username"
                placeholder="@peduarte"
                className="col-span-3"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                addUserToDB();
              }}
              variant={"link"}
            >
              get demo
            </Button>
            <Button
              variant={"link"}
              onClick={() => {
                router.push("/demo");
              }}
            >
              watch demo
            </Button>
            <Button
              onClick={() => {
                router.push("/docs");
              }}
              variant={"link"}
            >
              learn more
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br  opacity-95 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-6 cursor-pointer">
              <HelpCircleIcon className="w-12 h-12 text-white mb-4" />
              <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl mb-3">
                ReactJS
              </h1>
              <img
                src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1708830652/Screen_Shot_2024-02-24_at_7.10.01_PM_oxwvhy.png"
                width={700}
                height={460}
                className="rounded-xl border-2 border-slate-600"
                alt="Descriptive Alt Text"
              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] max-w-[400px]">
          <DialogHeader>
            <DialogTitle>get a demo:</DialogTitle>
            <DialogDescription>
              get a demo with a react.js codebase.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Pedro Duarte"
                className="col-span-3"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input
                id="username"
                placeholder="@peduarte"
                className="col-span-3"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                addUserToDB();
              }}
              variant={"link"}
            >
              get demo
            </Button>
            <Button
              variant={"link"}
              onClick={() => {
                router.push("/demo");
              }}
            >
              watch demo
            </Button>
            <Button
              onClick={() => {
                router.push("/docs");
              }}
              variant={"link"}
            >
              learn more
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Tiles;

function HelpCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

/*



     
*/
