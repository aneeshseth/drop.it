export default function Component3() {
  return (
    <div className="bg-[#121212] text-white p-8 h-full overflow-auto">
      <h1 className="text-5xl font-bold mb-4">Generating Logs during Builds</h1>
      <hr className="border-gray-700 mb-6" />
      <p className="mb-6">
        This is a feature that is to be added. Here's how I'd do it.
      </p>
      <h2 className="text-3xl font-bold mb-4">The task it does?</h2>
      <p className="mb-6">
        The task is to generate Logs how vercel does for when the project is
        being build and deployed to AWS.
      </p>
      <h2 className="text-2xl font-bold mb-4">How would I do it?</h2>
      <p className="mb-6">
        Firstly, since I'd have to generate logs in real-time, I would use
        WebSockets - a Real-Time protocol, and Redis, for real-time streaming of
        data for that user.
      </p>
      <h2 className="text-2xl font-bold mb-4">
        But how would I use Redis and WebSockets?
      </h2>
      <p className="mb-6">
        I would first create a WebSocket connection between the User and the
        server when routed to the deployments page. On pressing the deploy
        button, I would additionaly trigger a WebSocket event for the user to be
        subscribed to the ProjectID in Redis, and store their websocket object
        in a HashMap on the server with the key being the project name.
      </p>
      <p className="mt-2 mb-6">
        The build command, even though running on a Docker container on AWS is
        excecuted in a typescript file within that container architecture, which
        means that I could just publish the log generated to the redis projectID
        from that build command that was running using exec in the Typescript
        file using p.stdout?.on("data", function).
      </p>
      <p className="mt-2 mb-7">
        This log would then be recieved by a Redis callback for that projectID
        on the server, from where their WS object will be obtained, and sent to
        the designated client, and displayed in the browser.
      </p>
      <div className="rounded-t-lg bg-[#1F1F1F] p-4 mb-0.5">
        <div className="flex items-center space-x-2 text-sm">
          <CloudLightningIcon className="text-green-500" />
          <span className="font-bold">Log Genaration</span>
          <span className="text-gray-500">logs-service</span>
        </div>
        <div className="flex space-x-2 mt-2 rounded-md flex-col">
          <img
            src="https://images.ctfassets.net/ee3ypdtck0rk/0mExYcxsnzccWxnktAKjc/33a49e1e736a2f906216d630b84fb641/websockets.png?w=1840&h=745&q=50&fm=png"
            className="rounded-md h-[300px]"
          />
          <img
            src="https://avatars.githubusercontent.com/u/1529926?s=200&v=4"
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
