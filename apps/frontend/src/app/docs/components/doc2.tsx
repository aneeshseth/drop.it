"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Component2() {
  const router = useRouter();
  return (
    <div className="bg-[#121212] text-white p-8 h-full overflow-auto">
      <h1 className="text-5xl font-bold mb-4">K8S Cluster</h1>
      <hr className="border-gray-700 mb-6" />
      <p className="mb-6">This forms the moat of the project.</p>
      <h2 className="text-3xl font-bold mb-4">The task it does?</h2>
      <p className="mb-6">
        The K8s cluster is responsible for the scalability and security moat of
        the application. Every time a user creates a codebase, an Ingress, a
        Pod, and a Service are started.
      </p>
      <h2 className="text-2xl font-bold mb-4">Why a Pod/Service?</h2>
      <p className="mb-6">
        This Pod is responsible for running the codebase selected by the user.
        All file updates, all folders created/deleted, all of it is handled in
        the pod created, and the service allows access to the Pod.
      </p>
      <h2 className="text-2xl font-bold mb-4">Why an Ingress?</h2>
      <p className="mb-6">
        The ingress is created to handle path based routing. The service has a
        specific IP that I can hit, and it can only load balance requests, and
        not proxy them to the right pod for file updates, file created, terminal
        commands that need to run on the codebase, etc, which means that an
        ingress needs to be created which tells the ingress controller that any
        IP address that hits for eg: abc.ingress.com, would be routed to a
        service that is of the name abc.
      </p>
      <div className="rounded-t-lg bg-[#1F1F1F] p-4 mb-0.5">
        <div className="flex items-center space-x-2 text-sm">
          <CloudLightningIcon className="text-green-500" />
          <span className="font-bold">K8S Design</span>
          <span className="text-gray-500">codebase-service</span>
        </div>
        <div className="flex space-x-2 mt-2 rounded-md flex-col">
          <img
            src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1709080689/Screen_Shot_2024-02-27_at_4.37.24_PM_ixj1ib.png"
            className="rounded-md h-[400px] "
          />
          <img
            src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1709080752/Screen_Shot_2024-02-27_at_4.38.48_PM_zhoifn.png"
            className="rounded-md h-[500px]"
          />
          <img
            src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1709080752/Screen_Shot_2024-02-27_at_4.38.37_PM_gnr3hs.png"
            className="rounded-md h-[700px]"
          />
          <img
            src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1709080752/Screen_Shot_2024-02-27_at_4.38.59_PM_b8l2dn.png"
            className="rounded-md h-[800px]"
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
