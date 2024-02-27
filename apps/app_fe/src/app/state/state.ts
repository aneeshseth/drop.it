import { atom, selector } from "recoil";

export const codebaseState = atom({
  key: "textState",
  default: "",
});

export const charCountState = selector({
  key: "charCountState",
  get: ({ get }) => {
    const text = get(codebaseState);

    return text;
  },
});

export const userimage = atom({
  key: "userimage",
  default: ""
})

export const userimageState = selector({
  key: "imageState",
  get: ({ get }) => {
    const text = get(userimage);

    return text;
  },
});

const dummyFiles = [
  { dummy: true, id: 1, name: "loading...", type: "directory" },
];

export const filesState = atom({
  key: "filesstate",
  default: dummyFiles
})

export const currentFilesState = selector({
  key: "filescurrentstate",
  get: ({ get }) => {
    const text = get(filesState);
    return text;
  },
})