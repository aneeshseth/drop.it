"use client";
import React from "react";

function page({ params, searchParams }: any) {
  const INSTANCE_URI = `http://${params.id}.runapp.aneesh.pro`;
  return (
    <div>
      <div style={{ height: "100vh", background: "white" }}>
        <iframe width={"100%"} height={"100%"} src={`${INSTANCE_URI}`} />
      </div>
    </div>
  );
}

export default page;
