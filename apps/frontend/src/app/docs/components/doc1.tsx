import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Component() {
  return (
    <div className="bg-[#121212] text-white p-8 h-full overflow-auto">
      <h1 className="text-4xl font-bold mb-4">
        The <span className="text-blue-500">drop.it</span> design
        implementation.
      </h1>
      <div className="flex justify-center mt-10 mb-5">
        <img
          src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1709345216/Screen_Shot_2024-03-01_at_6.02.32_PM_jvhujf.png"
          className="rounded-md h-[200px] lg:h-[500px]"
        />
      </div>
      <hr className="border-gray-700 mb-6" />

      <h1 className="text-2xl font-bold mb-4">Problem Statement:</h1>
      <p className="mb-3 text-md">
        The problem statement is simple. I want to be able to write codebases in
        my browser, in multiple stacks: Typescript for React.js, C++, Python for
        Flask, Node.js + Typescript, etc. I need an integrated terminal to run
        my codebase, and an output screen to have my output for the server
        running streamed into the browser.
      </p>
      <p className="mb-6">The final codebase UI looks something like this:</p>
      <div className="flex justify-center mt-10 flex-col mb-10">
        <img
          src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1709345275/Screen_Shot_2024-03-01_at_4.46.53_PM_z7nes5.png"
          className="rounded-xl h-[200px] lg:h-[800px]"
        />
        <img
          src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1709345280/Screen_Shot_2024-03-01_at_4.47.48_PM_yigpka.png"
          className="rounded-md h-[200px] lg:h-[150px]"
        />
      </div>
      <p className="mb-6 text-md">
        Okay that was for all the fluff, now straight to the cooler stuff.
      </p>
      <p className="mb-6 text-lg">
        The application is built with 3 primary services: An aws-storage
        microservice, A Kubernetes orchestrator microservice, and A WebSocket
        service.
      </p>
      <p className="mb-6 text-lg">
        <b>The AWS Storage microservice</b>:
      </p>
      <p className="mb-6 text-md">
        Let’s say I am a client-side user, and I log onto the application, and
        choose my tech stack for the codebase I want to create. Each of those
        codebases will have a set of boilerplate files. For example: a codebase
        in go on initializing would have a main.go, a python would have an
        [app.py](http://app.py) for a flask server, and a Node.js would have an
        index.js with a package.json file. The AWS Storage Microservice is
        responsible for taking those boilerplate files that are stored on the
        server in a folder, and putting them with a random unique generated slug
        into S3.
      </p>
      <div className="flex mt-10 justify-center">
        <img
          src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1709345286/Screen_Shot_2024-03-01_at_4.54.02_PM_qnmij6.png"
          className="rounded-md h-[200px] lg:h-[500px]"
        />
      </div>
      <div className="flex mt-10 mb-10 justify-center">
        <img
          src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1709345293/Screen_Shot_2024-03-01_at_4.56.27_PM_drz3us.png"
          className="rounded-md h-[200px] lg:h-[500px]"
        />
      </div>
      <p className="mb-3 text-md">
        Okay hold on, before we move onto the next service (the K8s
        orchestration service), it’s important to understand how the
        architecture with K8s is actually built.
      </p>
      <p className="mb-3 text-md">
        There’s 3 main components what we’re using in K8s: A service, A pod, An
        Ingress, which has an ingress controller with an External IP listening
        for any updates to this architecture, and the IP we hit from the client.
      </p>
      <p className="mb-3 text-md">
        The pods are containers responsible for running a WebSocket server, the
        server which in real-time would listen to updates from the client who is
        editing the codebase files (which are also bought onto the container
        when the it is initialising, we’ll see how) to make sure all files are
        up to date server side too, for any terminal commands, especially
        commands like the installation ones which in your terminal in real-time
        show you the installation progress, or htop which shows you your CPU
        usage on the device.
      </p>
      <p className="mb-3 text-md">
        But, Why not a simple K8s Architecture without an Ingress? Why don’t we
        just get x number of nodes, and have a K8s service that has an external
        IP that would give us access to Pods, and maybe a Horizontal Autoscaler
        for pods being created everytime a new codebase is created?
      </p>
      <div className="flex justify-center mt-10 mb-5">
        <img
          src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1709345298/Screen_Shot_2024-03-01_at_5.30.32_PM_hmvbo6.png"
          className="rounded-md h-[200px] lg:h-[500px]"
        />
      </div>
      <p className="mb-3 text-xl">
        <b>Path Based Routing.</b>
      </p>
      <p className="mb-3 text-md">
        We know that there’s a WebSocket server running. The WebSocket server
        will be exposed from the K8s Service in front of it that needs to be
        hit. So let’s say the ip address was x.y.y.z, and it was pointing to
        example.com. The issue here is that what would the difference between
        the WebSocket server 1 which has a codebase named “woadlch” running
        which I’m hitting example.com for, and the server 2 which would have a
        codebase named “kjsbncdoi” for which I’d again be hitting example.com
        for. In this case while I will have two pods created for me to run the
        codebase, how will I locate the right codebase/pod for further requests?
        There’s an issue he
      </p>
      <p className="mb-3 text-md">
        Logically, this leads to one thing. I need a new IP address for every
        new codebase i create, the IP address being of a service which means
        that a new service and a pod which stores my filesystem and runs the
        websocket server is needed everytime a codebase is created. And this is
        where the Ingress comes in.
      </p>
      <div className="flex justify-center mt-10 mb-5">
        <img
          src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1709345310/Screen_Shot_2024-03-01_at_5.42.53_PM_vnk3j3.png"
          className="rounded-md h-[200px] lg:h-[500px]"
        />
      </div>
      <p className="mb-3 text-md">
        Logically, this leads to one thing. I need a new IP address for every
        new codebase i create, the IP address being of a service which means
        that a new service and a pod which stores my filesystem and runs the
        websocket server is needed everytime a codebase is created. And this is
        where the Ingress comes in.
      </p>
      <p className="mb-3 text-md">
        The Ingress’s job is to simply do the following task:
      </p>
      <p className="mb-3 text-md">
        Whenever a request comes to the Ingress Controller (the component that
        has the external IP to hit, which orchestrates, and routes incoming
        traffic), checks the codebase id within the wildcard domain so
        “eqhksbc.k8sserver.com”, and routes the request to the right service
        which has access to the Pod running the codebase with id eqhksbc, and
        the websocket requests, and all others are resolved from there.
      </p>
      <div className="flex justify-center mt-10 mb-5">
        <img
          src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1709345304/Screen_Shot_2024-03-01_at_5.37.25_PM_wxm4to.png"
          className="rounded-md h-[200px] lg:h-[500px]"
        />
      </div>
      <p className="mb-3 text-md">
        Now FINALLY, we come back to our initial 2nd bullet point: The
        Kubernetes orchestrator microservice.
      </p>

      <p className="mb-3 text-md">
        This microservice is responsible for exactly the above, to create a Pod
        which would run my WebSocket server, a Service that would expose my pod,
        and an Ingress, which would tell the ingress controller to route all
        requests from *codebase_name*.k8sserver.com to this service I just
        created.
      </p>
      <p className="mb-3 text-2xl">And lastly, the WebSocket service.</p>
      <p className="mb-3 text-md">
        The WebSocket service is exactly the one above, the service running
        within the Pod. It is responsible to listen to any Client-Side events
        for the terminal that is running on the server, codebase file changes,
        dependency management, etc.
      </p>
      <p className="mb-3 text-2xl mt-5">Further Optimizations:</p>
      <p className="mb-3 text-xl mt-5">1) Optimizing WebSocket events.</p>
      <p className="mb-3 text-md">
        Because we are constantly updating the server through WebSocket events
        for changes in the file system, the current system would change to
        updating only diffs within the file instead of writing to the whole file
        each time.
      </p>
      <p className="mb-3 text-xl mt-5">
        2) Optimizing for resources used in K8s.
      </p>
      <p className="mb-3 text-md">
        These pods created for the codebase should go down every time a user
        logs off the application, and all changes should be asynchronously
        handled by another service which is listening to a central distributed
        messaging system like RabbitMQ which would have file contents of the
        updated filesystem after the user has left the app, and add it to the
        write codebase stored on AWS S3 for persistent storage.
      </p>
      <div className="flex justify-center mt-10 mb-5">
        <img
          src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1709345216/Screen_Shot_2024-03-01_at_6.02.32_PM_jvhujf.png"
          className="rounded-md h-[200px] lg:h-[500px]"
        />
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
