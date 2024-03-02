"use client";
import React, { useEffect } from "react";
import * as Icons from "./icon";
import { useRef } from "react";
import { useState } from "react";

function FileTree(props: React.JSX.IntrinsicAttributes & { files: any[] }) {
  return <SubTree allFiles={props.files} {...props} />;
}

function SubTree({
  files,
  allFiles,
  selectedFile,
  onSelect,
  current_socket,
  ...props
}: any) {
  const socket = useRef<WebSocket | null>(null);
  useEffect(() => {
    socket.current = current_socket;
  }, []);
  return (
    <div className="">
      {files.map((child: any) => (
        <React.Fragment key={child.id}>
          {child.type === "dir" ? (
            <Directory
              files={files}
              allFiles={allFiles}
              selectedFile={selectedFile}
              onSelect={onSelect}
              current_socket={current_socket}
              {...child}
            />
          ) : (
            <File
              selectedFile={selectedFile}
              allFiles={allFiles}
              onClick={(_: any) => onSelect(child)}
              current_socket={current_socket}
              {...child}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function Directory(props: any) {
  const [open, setOpen] = useState(false);
  const [children, setChildren] = useState([]);
  const [childrenFetched, setChildrenFetched] = useState(false);
  const socket = useRef<WebSocket | null>(null);
  socket.current = props.current_socket;
  const toggle = () => {
    if (!childrenFetched && open) {
      if (socket.current) {
        socket.current.send(
          JSON.stringify({
            type: "fetchFilesSubRoot",
            dir: `/${props.name}`,
          })
        );
        socket.current.onmessage = (event: any) => {
          const parsedData = JSON.parse(event.data);
          if (parsedData.type === "filesFetchedSubRoot") {
            setChildren(parsedData.files);
            setChildrenFetched(true);
          }
        };
      }
    }
    setOpen(!open);
  };

  useEffect(() => {
    if (open && !childrenFetched) {
      toggle();
    }
  }, [open, childrenFetched, socket]);

  return (
    <>
      <div className="ml-2 mt-5">
        <File
          icon={open ? "OpenDirectory" : "ClosedDirectory"}
          selectedFile={props.selectedFile}
          allFiles={props.allFiles}
          onClick={toggle}
          {...props}
        />
      </div>
      {open ? (
        <div className="ml-4 mt-5">
          <SubTree
            files={children}
            allFiles={props.allFiles}
            selectedFile={props.selectedFile}
            onSelect={props.onSelect}
            current_socket={socket.current}
          />
        </div>
      ) : null}
    </>
  );
}

function FileIcon({ name, extension }: any) {
  //@ts-ignore
  const Icon = Icons[extension] || Icons[name];
  return <Icon />;
}

function File(props: {
  selectedFile: { id: any };
  id: any;
  allFiles: any;
  icon: any;
  name: string;
  current_socket: any;
  onClick: any;
}) {
  return (
    <div className="flex items-center mb-2 ml-2 mt-5">
      <FileIcon
        name={props.icon || "File"}
        extension={props.name.split(".").pop()}
      />
      <div
        onClick={props.onClick}
        style={{ cursor: "pointer", marginLeft: "5px" }}
      >
        {props.name}
      </div>
    </div>
  );
}

function sortingFunction(
  a: { type: string; name: number },
  b: { type: any; name: number }
) {
  // directories come first, sorted alphabetically
  // then files, also sorted alphabetically
  let first;

  if (a.type === b.type) {
    if (a.name < b.name) first = a;
    else first = b;
  } else if (a.type === "directory") {
    first = a;
  } else {
    first = b;
  }

  if (first === a) return -1;
  else return 1;
}

function isRootLevel(files: any[], file: { directory: any; type: any }) {
  const parentId = file.type;
  if (parentId == "dir") return true;

  const parent = files.find((file: { id: any }) => file.id === parentId);
  if (!parent) return true;
}

function isChildSelected({ allFiles, directory, selectedFile }: any) {
  const filesInCurrentSubTree = getFilesInSubTree(allFiles, selectedFile);

  return filesInCurrentSubTree.find((file) => file.id === directory.id);
}

function getFilesInSubTree(allFiles: any, selectedFile: any) {
  if (!selectedFile) return [];
  const currentModuleTree = [selectedFile];

  let parentDirectory = getParentDirectory(allFiles, selectedFile);

  while (parentDirectory) {
    currentModuleTree.push(parentDirectory);
    // get parent directory of the parent directory
    parentDirectory = getParentDirectory(allFiles, parentDirectory);
  }

  return currentModuleTree;
}

function getParentDirectory(allFiles: any[], file: { directory: any }) {
  if (file.directory) {
    return allFiles.find((parent: { id: any }) => parent.id === file.directory);
  }
}

export default FileTree;
