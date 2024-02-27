"use client";
import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

type KeyboardCommand = {
  key: string;
};

export function TerminalComponent(props: { current_socket: WebSocket | null }) {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const socket = useRef<WebSocket | null>(null);
  const currentCommands = useRef<KeyboardCommand[]>([]);
  useEffect(() => {
    socket.current = props.current_socket;
    //@ts-ignore
    term.current = new Terminal({
      cursorBlink: true,
    });
    //@ts-ignore
    term.current.open(terminalRef.current);
    initializeTerminal();
    if (socket.current) {
      socket.current!.onmessage = (event: any) => {
        const parsedData = JSON.parse(JSON.stringify(event.data));
        if (JSON.parse(parsedData).type == "terminal") {
          //@ts-ignore
          term.current.write(JSON.parse(parsedData).output);
        }
      };
    }
  }, []);

  function checkMakeOrRemoveDir() {
    const enteredCommand = currentCommands.current
      .map((command) => command.key)
      .join("");
    if (enteredCommand.includes("mkdir") || enteredCommand.includes("touch")) {
      console.log(socket.current);
      window.location.reload();
    }
  }

  const initializeTerminal = () => {
    //@ts-ignore
    if (term.current._initialized) return;
    //@ts-ignore
    term.current._initialized = true;
    //@ts-ignore
    term.current.prompt = () => {
      //@ts-ignore
      term.current.write("\r\n$ ");
    };
    prompt();
    //@ts-ignore
    term.current.onKey((key) => {
      currentCommands.current.push({ key: key.key });
      runCommand(key.key);
      if (key.domEvent.key === "Enter") {
        checkMakeOrRemoveDir();
        currentCommands.current = [];
      }
      socket.current!.onmessage = (event: any) => {
        if (event.data[0] != "{") return;
        const parsedData = JSON.parse(JSON.stringify(event.data));
        if (JSON.parse(parsedData).type == "terminal") {
          //@ts-ignore
          term.current.write(JSON.parse(parsedData).output);
        }
      };
    });
  };

  const prompt = () => {
    //@ts-ignore
    term.current.write("\r\n$ ");
  };

  const runCommand = (command: any) => {
    if (socket.current) {
      socket.current!.send(
        JSON.stringify({
          type: "terminal",
          command: command,
        })
      );
    }
  };

  return (
    <div
      style={{
        height: "100%",
        margin: "10px",
        overflowWrap: "break-word",
      }}
      className="rounded-md border-2 w-full"
    >
      <div ref={terminalRef} style={{ height: "100%" }} className="w-full" />
      <button
        onClick={() => {
          console.log(socket.current);
        }}
      ></button>
    </div>
  );
}
