# drop.it - **writing codebases in your browser.**

<img width="1355" alt="image" src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1711328316/Screen_Shot_2024-03-24_at_5.56.47_PM_vkwtuo.png">

The problem statement is simple. I want to be able to write codebases in my browser, in multiple stacks: Typescript for React.js, C++, Python for Flask, Node.js + Typescript, etc. I need an integrated terminal to run my codebase, and an output screen to have my output for the server running streamed into the browser.

The final codebase UI looks something like this:

<img width="1355" alt="image" src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1711328316/Screen_Shot_2024-03-24_at_5.56.59_PM_n36egp.png">

The application is built with 3 primary services:

- An aws-storage microservice
- A Kubernetes orchestrator microservice
- A WebSocket service.

# The AWS Storage microservice:

Let’s say I am a client-side user, and I log onto the application, and choose my tech stack for the codebase I want to create. Each of those codebases will have a set of boilerplate files. For example: a codebase in go on initializing would have a main.go, a python would have an app.py for a flask server, and a Node.js would have an index.js with a package.json file. 

The AWS Storage Microservice is responsible for taking those boilerplate files that are stored on the server in a folder, and putting them with a random unique generated slug into S3.

<img width="1355" alt="image" src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1711328316/Screen_Shot_2024-03-24_at_5.57.12_PM_hxuozv.png">
<img width="1355" alt="image" src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1711328316/Screen_Shot_2024-03-24_at_5.57.21_PM_xucggm.png">

Okay hold on, before we move onto the next service (the K8s orchestration service), it’s important to understand how the architecture with K8s is actually built.

There’s 3 main components what we’re using in K8s:

- A service
- A pod
- An Ingress, which has an ingress controller with an External IP listening for any updates to this architecture, and the IP we hit from the client.

The pods are containers responsible for running a WebSocket server, the server which in real-time would listen to updates from the client who is editing the codebase files (which are also bought onto the container when the it is initialising, we’ll see how) to make sure all files are up to date server side too, for any terminal commands, especially commands like  the installation ones which in your terminal in real-time show you the installation progress, or htop which shows you your CPU usage on the device. 

But, Why not a simple K8s Architecture without an Ingress? Why don’t we just get x number of nodes, and have a K8s service that has an external IP that would give us access to Pods, and maybe a Horizontal Autoscaler for pods being created everytime a new codebase is created?

<img width="1355" alt="image" src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1711328316/Screen_Shot_2024-03-24_at_5.57.29_PM_keq3zk.png">

# Path based Routing.

<img width="1355" alt="image" src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1711328316/Screen_Shot_2024-03-24_at_5.57.38_PM_js9pfg.png">

We know that there’s a WebSocket server running. The WebSocket server will be exposed from the K8s Service in front of it that needs to be hit. So let’s say the ip address was x.y.z.m, and it was pointing to example.com. The issue here is that what would the difference between the WebSocket server 1 which has a codebase named “woadlch” running which I’m hitting example.com for, and the server 2 which would have a codebase named “kjsbncdoi” for which I’d again be hitting example.com for. In this case while I will have two pods created for me to run the codebase, how will I locate the right codebase/pod for further requests? There’s an issue here.

Logically, this leads to one thing. I need a new IP address for every new codebase i create, the IP address being of a service which means that a new service and a pod which stores my filesystem and runs the websocket server is needed everytime a codebase is created. **And this is where the Ingress comes in.**

<img width="1355" alt="image" src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1711328316/Screen_Shot_2024-03-24_at_5.57.38_PM_js9pfg.png">

The Ingress’s job is to simply do the following task:

Whenever a request comes to the Ingress Controller (the component that has the external IP to hit, which orchestrates, and routes incoming traffic), checks the codebase id within the wildcard domain so “eqhksbc.k8sserver.com”, and routes the request to the right service which has access to the Pod running the codebase with id eqhksbc, and the websocket requests, and all others are resolved from there.

<img width="1355" alt="image" src="https://res.cloudinary.com/dysiv1c2j/image/upload/v1711328315/Screen_Shot_2024-03-24_at_5.57.46_PM_kv7hqp.png">

Now FINALLY, we come back to our initial 2nd bullet point: The Kubernetes orchestrator microservice.

This microservice is responsible for exactly the above, to create a Pod which would run my WebSocket server, a Service that would expose my pod, and an Ingress, which would tell the ingress controller to route all requests from *codebase_name*.k8sserver.com to this service I just created.

And lastly, the WebSocket service. 

The WebSocket service is exactly the one above, the service running within the Pod. It is responsible to listen to any Client-Side events for the terminal that is running on the server, codebase file changes, dependency management, etc.

And every time the user comes back to this codebase, their request is routed to the pod through the Ingress controller, and a new WebSocket connection is created. 

# Further Optimizations:

1) Optimizing WebSocket events.

- Because we are constantly updating the server through WebSocket events for changes in the file system, the current system would change to updating only diffs within the file instead of writing to the whole file each time.

2) Optimizing for resources used in K8s.

- These pods created for the codebase should go down every time a user logs off the application, and all changes should be asynchronously handled by another service which is listening to a central distributed messaging system like RabbitMQ which would have file contents of the updated filesystem after the user has left the app, and add it to the write codebase stored on AWS S3 for persistent storage.

# Tech Stack:

- Kubernetes
- Docker
- Typescript
- Node.js
- Next.js
- Tailwind CSS
- ShadCN/ui





