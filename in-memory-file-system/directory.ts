import MyFile from "./file";

export default class MyDirectory {
  name: string;
  path: string;
  children: MyDirectory[] & MyFile[];
  contents?: string;

  constructor(name: string, path: string, children: MyDirectory[] & MyFile[]) {
    this.name = name;
    this.path = path;
    this.children = children;
  }
}
