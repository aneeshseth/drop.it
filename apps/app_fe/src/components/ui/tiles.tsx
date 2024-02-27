"use client";
import React, { useEffect, CSSProperties, useState } from "react";
import { useRouter } from "next/navigation";
import { charCountState, codebaseState, userimage } from "@/app/state/state";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import RotateLoader from "react-spinners/RotateLoader";

function Tiles({user_image ,...props}: any) {
  console.log(user_image)
  const router = useRouter();
  const [_text, setText] = useRecoilState(codebaseState);
  const [image, setImage] = useRecoilState(userimage)
  const count = useRecoilValue(charCountState);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");
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
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25."
];
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  useEffect(() => {
    setImage(user_image)
    setThisJoke(programmingJokes[Math.floor(Math.random() * programmingJokes.length)])
  }, [])
  function generateRandomString(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    while (randomString.length < length) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }


    if (!randomString.match(/^[a-z]([-a-z0-9]*[a-z0-9])?$/)) {
       
        return generateRandomString(length);
    }

    return randomString;
}

const [thisJoke, setThisJoke] = useState("")
  async function startCodebase(lang: string) {
    const slug = generateRandomString(7);
    await axios.post("http://localhost:3002/pre_init", {
      codebase_name: slug.toLowerCase(),
      language: lang
    });
    await axios.post("http://localhost:3005/init", {
      codebase_name: slug.toLowerCase(),
      language: lang
    })
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
      router.push(`/codebase/${slug.toString().toLowerCase()}`);
    }, 9000);
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
            Your codebase is loading, until then, here's something: {thisJoke} hahahahaha{" "}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="px-4 md:px-6 md:py-8 mt-5 flex justify-center">
      <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br  opacity-95 group-hover:opacity-100 transition-opacity" />
        <div
          className="relative p-6 cursor-pointer"
        >
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
            onClick={() => {
              setText("node");
              startCodebase("node");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Tiles;

function CloudIcon(props: any) {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

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

function ShieldIcon(props: any) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}
