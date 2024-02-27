# Distributed Deployment Service

A deployment service to deploy ReactJS apps.

# AWS ECS Containers

This forms the moat of the project.

<img width="1355" alt="image" src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1707861570/Screen_Shot_2024-02-13_at_1.58.33_PM_zs65by.png">
<img width="1355" alt="image" src="https://res.cloudinary.com/dhxeo4rvc/image/upload/v1707861570/Screen_Shot_2024-02-13_at_1.59.17_PM_ylkpsa.png">

## The task it does?
Clones the Github URL Repo in a Docker container deployed to ECS - Builds the code to generate HTML, CSS, and JS files to be served to the browser - Store those generated files to AWS S3 - all using a Docker container, a triggered .sh file from the container, and an index.ts which adds the built files to S3.

## Why does this work?
This architecture allows for fairly high security since the arbitrary code is built in a Containerized Docker env on the Cloud, and the functions to send those files to S3 also happen on those independent containers.

## Can this scale?
Yes. The deployment service running on ECS containers can allow as many containers to be created as needed through AWS Autoscaling, hence scalable.

# Generating Logs during Builds

This is a feature that is to be added. Here's how I'd do it.

## The task it does?
The task is to generate Logs how vercel does for when the project is being build and deployed to AWS.

## How would I do it?
Firstly, since I'd have to generate logs in real-time, I would use WebSockets - a Real-Time protocol, and Redis, for real-time streaming of data for that user.

## But how would I use Redis and WebSockets?
I would first create a WebSocket connection between the User and the server when routed to the deployments page. On pressing the deploy button, I would additionaly trigger a WebSocket event for the user to be subscribed to the ProjectID in Redis, and store their websocket object in a HashMap on the server with the key being the project name.

The build command, even though running on a Docker container on AWS is excecuted in a typescript file within that container architecture, which means that I could just publish the log generated to the redis projectID from that build command that was running using exec in the Typescript file using p.stdout?.on("data", function).

This log would then be recieved by a Redis callback for that projectID on the server, from where their WS object will be obtained, and sent to the designated client, and displayed in the browser.

<img width="1355" alt="image" src="https://images.ctfassets.net/ee3ypdtck0rk/0mExYcxsnzccWxnktAKjc/33a49e1e736a2f906216d630b84fb641/websockets.png?w=1840&h=745&q=50&fm=png">
<img width="1355" alt="image" src="https://avatars.githubusercontent.com/u/1529926?s=200&v=4">

