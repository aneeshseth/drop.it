"use client";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
const fitAddon = new FitAddon();

function ab2str(buf: string) {
  //@ts-ignore
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

const OPTIONS_TERM = {
  useStyle: true,
  screenKeys: true,
  cursorBlink: true,
  cols: 200,
  theme: {
    background: "black",
  },
};
export default function TerminalComponent() {
  const terminalRef = useRef<any>();

  useEffect(() => {
    if (!terminalRef || !terminalRef.current) {
      return;
    }

    const term = new Terminal(OPTIONS_TERM);
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();
    function terminalHandler({ data }: any) {
      if (data instanceof ArrayBuffer) {
        console.error(data);
        //@ts-ignore
        console.log(ab2str(data));
        //@ts-ignore
        term.write(ab2str(data));
      }
    }
    term.onData((data) => {
      term.write(data);
    });
  }, [terminalRef]);

  return <div ref={terminalRef} className="h-96 w-96"></div>;
}
