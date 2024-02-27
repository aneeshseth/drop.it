"use client";
import React, { useState, CSSProperties, useEffect } from "react";
import FileTree from "./components/file-tree";
import TerminalComponent from "./terminal";
import Editor, { Monaco } from "@monaco-editor/react";
import { useRef } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/button";
import RotateLoader from "react-spinners/RotateLoader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRecoilState, useRecoilValue } from "recoil";
import { charCountState, codebaseState, currentFilesState, filesState, userimageState } from "@/app/state/state";
import { useRouter } from "next/navigation";


const dummyFiles = [
  { dummy: true, id: 1, name: "loading...", type: "directory" },
];

export default function App({ params, searchParams }: any) {
  /*states and refs*/
  const [currentLanguage, setLanguage] = useState("");
  const monacoRef = useRef(null);
  const terminalRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [fileS, setFileS] = useRecoilState(filesState)
  const currentFiles = useRecoilValue(currentFilesState)
  const image = useRecoilValue(userimageState)
  const [color, setColor] = useState("#ffffff");
  const [currentCodeValue, setCurrentCodeValue] = useState("");
  const [files, setFiles] = React.useState(dummyFiles);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const socket = useRef<WebSocket | null>(null);
  const count = useRecoilValue(charCountState);
  const router = useRouter()
  //initial render useffect
  useEffect(() => {
    const websocket = new WebSocket(`ws://${params.id}.wsserver.aneesh.wiki`);
    console.log(websocket)
    websocket.onopen = () => {
      console.log("WS OPENED")
      socket.current = websocket;
      setLoading(false)
      websocket.send(
        JSON.stringify({
          type: "fetchFilesRoot",
          dir: "/",
        })
      );
    };
    websocket.onerror = () => {
      router.push("/")
    }
    websocket.onmessage = (event) => {
      const parsed_message = JSON.parse(event.data);
      if (parsed_message.type == "filesFetchedRoot") {
        parsed_message.files.find((file: any) => file.name == "index.js")
        setSelectedFile(parsed_message.files.find((file: any) => file.name == "index.js"))
        socket.current?.send(
          JSON.stringify({
            type: "fetchFileContent",
            fileName: `/${parsed_message.files.find((file: any) => file.name == "index.js").path}`,
          })
        );
        socket.current!.onmessage = (event: any) => {
          console.log(event.data)
          setCurrentCodeValue(JSON.parse(event.data).content);
        };
        setFiles(parsed_message.files);
      }
      if (parsed_message.type == "fetchFileContent") {
        console.log(parsed_message);
      }
    };
  }, []);
  const programmingJokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
    "Why don't programmers like nature? It has too many bugs.",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "Why did the programmer go to therapy? Because he had too many arrays.",
    "Why do programmers always get Christmas and Halloween mixed up? Because Oct(31) == Dec(25).",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Why did the programmer get stuck in the shower? Because the instructions said 'lather, rinse, repeat.'",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
    "Why don't programmers like nature? It has too many bugs.",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "Why did the programmer go to therapy? Because he had too many arrays.",
    "Why do programmers always get Christmas and Halloween mixed up? Because Oct(31) == Dec(25).",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Why did the programmer get stuck in the shower? Because the instructions said 'lather, rinse, repeat.'",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25."
];

  const [thisJoke, setThisJoke] = useState("")

  useEffect(() => {
    setThisJoke(programmingJokes[Math.floor(Math.random() * programmingJokes.length)])
    if (socket.current) {
      socket.current.onmessage = (event) => {
        const parsed_message = JSON.parse(event.data);
        console.log(event.data)
        if (parsed_message.type == "newFileAdded") {
          setSelectedFile(parsed_message.files.find((file: any) => file.name == "index.js"))
          socket.current?.send(
            JSON.stringify({
              type: "fetchFileContent",
              fileName: `/${parsed_message.files.find((file: any) => file.name == "index.js").path}`,
            })
          );
          socket.current!.onmessage = (event: any) => {
            console.log(event.data)
            setCurrentCodeValue(JSON.parse(event.data).content);
          };
          setFileS(parsed_message.files);
          setFiles(parsed_message.files);
        }
        if (parsed_message.type == "filecontent") {
          setCurrentCodeValue(JSON.parse(event.data).content);
        }
      };
    }
  });

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  function handleEditorWillMount(monaco: Monaco) {
    setLanguage(count);
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    monacoRef.current = monaco;
    setLanguage(count);
  }

  const onSelect = (file: any) => {
    console.log(`/${file.path}`)
    socket.current?.send(
      JSON.stringify({
        type: "fetchFileContent",
        fileName: `/${file.path}`,
      })
    );
    socket.current!.onmessage = (event: any) => {
      console.log(event.data)
      setCurrentCodeValue(JSON.parse(event.data).content);
    };
    setSelectedFile(file);
    handleEditorChange(file.code);
  };
  function handleEditorChange(value: any) {
    setCurrentCodeValue(value);
    if (selectedFile && currentCodeValue != undefined && value != undefined) {
      socket.current?.send(
        JSON.stringify({
          type: "updateFile",
          content: value == undefined ? "" : value,
          //@ts-ignore
          fileName: `/${selectedFile.path}`,
        })
      );
    }
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen flex-col">
        <div className="mb-10">
          <RotateLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <div>
          <p className="leading-7 [&:not(:first-child)]:mt-20 ml-5 mr-5 text-center">
            syncing connection with server.
          </p>
        </div>
      </div>
    );
  }

  async function updateFileStucture() {
    console.log('updating file')
    socket.current!.send(
      JSON.stringify({
        type: "fetchFilesRootNow",
        dir: "/",
      })
    );
    socket.current!.onmessage = (event) => {
      const parsed_message = JSON.parse(event.data);
    };
  }
  return (
    <>
      <div className="flex justify-between items-center gap-5 w-screen rounded-md m-2">
      <div className="w-full absolute h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="w-full h-screen"
            particleColor="#FFFFFF"
          />
        </div>
        <div style={{ zIndex: "20" }}>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                Codebase
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-auto">
              <FileTree
                files={files}
                //@ts-ignore
                selectedFile={selectedFile}
                onSelect={onSelect}
                current_socket={socket.current}
              />
            </SheetContent>
          </Sheet>
        </div>
        <Button
          className="mr-10 bg-blue-900 hover:bg-blue-500"
          style={{zIndex: "20"}}
          onClick={() => {
            alert('make sure to start your server with: node index.js')
            window.open(`http://localhost:3000/output/${params.id}`, "_blank")
          }}
        >
          Show Output
        </Button>
      </div>
      <div className="w-screen flex">
        <div
          className="w-1/5 rounded-md border-2 m-2 sm:hidden md:hidden lg:block hidden overflow-auto"
          style={{ zIndex: 20, position: "relative", height: "80vh" }}
        >
          <FileTree
            files={files}
            //@ts-ignore
            selectedFile={selectedFile}
            onSelect={onSelect}
            current_socket={socket.current}
          />
        </div>
        <div
          className="w-full m-2 border-2 rounded-md sm:w-full md:w-full lg:w-4/5"
          style={{ height: "80vh" }}
        >
          <Editor
            key="javascript"
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue={currentCodeValue}
            beforeMount={handleEditorWillMount}
            value={currentCodeValue}
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
          />
        </div>
      </div>
      <div ref={terminalRef} className="w-screen">
        <TerminalComponent current_socket={socket.current} onUpdate={updateFileStucture} />
      </div>
    </>
  );
}

