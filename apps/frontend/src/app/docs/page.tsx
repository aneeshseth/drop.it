"use client";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/app/docs/profile-form";
import "./page.css";
import { useState } from "react";
import Component from "./components/doc1";
import Component2 from "./components/doc2";
import Component3 from "./components/doc3";
import { useRouter } from "next/navigation";

export default function SettingsProfilePage() {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <div className="w-screen h-screen border-2 border-neutral-800 flex rounded-xl p-3">
        <div className="w-3/12 flex flex-col gap-3 border-neutral-800 border-2 rounded-xl len-div">
          <div className="mt-10">
            <h2 className="scroll-m-20 border-b pb-3 text-2xl font-mono  transition-colors first:mt-0 text-center">
              Microservices
            </h2>
          </div>
          <div
            className="ml-8 mt-10 p-1 mr-2"
            onClick={() => {
              setIsCreate(false);
              setIsUpdate(true);
              setIsUpload(false);
            }}
          >
            <h3
              className={`scroll-m-20 text-xl font-normal tracking-tight text-neutral-500 hover:text-white hover:cursor-pointer transform transition-all duration-200 ${isUpdate ? "text-red-500" : ""}`}
            >
              AWS ECS Containers
            </h3>
          </div>
          <div
            className="ml-8 mt-2 p-1 mr-2"
            onClick={() => {
              setIsCreate(true);
              setIsUpdate(false);
              setIsUpload(false);
            }}
          >
            <h3
              className={`scroll-m-20 text-xl font-normal tracking-tight text-neutral-500 hover:text-white hover:cursor-pointer transform transition-all duration-200 ${isCreate ? "text-red-500" : ""}`}
            >
              API Service
            </h3>
          </div>
          <div
            className="ml-8 mt-2 p-1 mr-2"
            onClick={() => {
              setIsCreate(false);
              setIsUpdate(false);
              setIsUpload(true);
            }}
          >
            <h3
              className={`scroll-m-20 text-xl font-normal tracking-tight text-neutral-500 hover:text-white hover:cursor-pointer transform transition-all duration-200 ${isUpload ? "text-red-500" : ""}`}
            >
              Runtime Logs
            </h3>
          </div>
          <div className="ml-8 mt-2 p-1 mr-2 justify-center w-full"></div>
        </div>
        <div className="w-9/12 border-neutral-800 rounded-xl border-2 r-div p-2">
          {isCreate && <Component />}
          {isUpdate && <Component2 />}
          {isUpload && <Component3 />}
        </div>
      </div>
    </>
  );
}
