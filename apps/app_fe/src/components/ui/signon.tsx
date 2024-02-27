import React from "react";
import { Button } from "./button";

export const Signon = () => {
  return (
    <div className="w-screen justify-center border-2 border-solid">
      <div>
        <Button
          variant={"link"}
          className="text-yellow-400"
          onClick={() => {
            alert("hx");
          }}
        >
          drop code.
        </Button>
      </div>
    </div>
  );
};
