"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Component2() {
  const router = useRouter();
  return (
    <div className="bg-[#121212] text-white p-8 h-full overflow-auto">
      <h1 className="text-5xl font-bold mb-4">AWS ECS Containers </h1>
      <hr className="border-gray-700 mb-6" />
      <p className="mb-6">This forms the moat of the project.</p>
      <h2 className="text-3xl font-bold mb-4">The task it does?</h2>
      <p className="mb-6">
        Clones the Github URL Repo in a Docker container deployed to ECS -
        Builds the code to generate HTML, CSS, and JS files to be served to the
        browser - Store those generated files to AWS S3 -{" "}
        <b>
          all using a Docker container, a triggered .sh file from the container,
          and an index.ts which adds the built files to S3.
        </b>
      </p>
      <h2 className="text-2xl font-bold mb-4">Why does this work?</h2>
      <p className="mb-6">
        This architecture allows for fairly high security since the arbitrary
        code is built in a Containerized Docker env on the Cloud, and the
        functions to send those files to S3 also happen on those independent
        containers.
      </p>
      <h2 className="text-2xl font-bold mb-4">Can this scale?</h2>
      <p className="mb-6">
        Yes. The deployment service running on ECS containers can allow as many
        containers to be created as needed through AWS Autoscaling, hence
        scalable.
      </p>
      <div className="rounded-t-lg bg-[#1F1F1F] p-4 mb-0.5">
        <div className="flex items-center space-x-2 text-sm">
          <CloudLightningIcon className="text-green-500" />
          <span className="font-bold">ECS Containers</span>
          <span className="text-gray-500">deployment-service</span>
        </div>
        <div className="flex space-x-2 mt-2 rounded-md flex-col">
          <img
            src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1707861570/Screen_Shot_2024-02-13_at_1.58.33_PM_zs65by.png"
            className="rounded-md h-[600px]"
          />
          <img
            src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1707861570/Screen_Shot_2024-02-13_at_1.59.17_PM_ylkpsa.png"
            className="rounded-md h-[400px]"
          />
        </div>
      </div>
    </div>
  );
}

function CloudLightningIcon(props: any) {
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
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}

function FilterIcon(props: any) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListOrderedIcon(props: any) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}
