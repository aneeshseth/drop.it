"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

export function PickerButton() {
  const router = useRouter();
  return (
    <div>
      <Button
        variant={"link"}
        className="text-white mt-5 text-lg underline"
        onClick={() => {
          router.push("/docs");
        }}
      >
        create codebase.
      </Button>
    </div>
  );
}
