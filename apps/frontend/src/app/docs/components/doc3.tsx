export default function Component3() {
  return (
    <div className="bg-[#121212] text-white p-8 h-full overflow-auto">
      <h1 className="text-5xl font-bold mb-4">Frontend Components/State</h1>
      <hr className="border-gray-700 mb-6" />
      <h2 className="text-3xl font-bold mb-4">How was it built?</h2>
      <p className="mb-6">
        The frontend was written using Next.js and Tailwind CSS, using ShadCN/ui
        and other such libraries. Any and all state was handled using Recoil, a
        Redux equivalent.
      </p>
      <div className="rounded-t-lg bg-[#1F1F1F] p-4 mb-0.5">
        <div className="flex items-center space-x-2 text-sm">
          <CloudLightningIcon className="text-green-500" />
        </div>
        <div className="flex space-x-2 mt-2 rounded-md flex-col">
          <img
            src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1709081205/Screen_Shot_2024-02-27_at_4.46.37_PM_dciohj.png"
            className="object-cover rounded-md h-[500px]"
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
