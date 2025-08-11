import MyFile from "./file";
import MyDirectory from "./directory";

// leetcode 558 https://leetcode.com/problems/design-in-memory-file-system/
// in future create AC to add size to file and sort by size first
// - if there is a tie sort lexographically
// also create AC to deal with file extensions properly

export default class FileSystem {
  root: MyDirectory;

  constructor() {
    this.root = new MyDirectory("", "/", []);
  }

  ls(path: string): string[] {
    let pathNames = path.split("/").slice(1).filter(Boolean);
    let cur = this.root;
    while (pathNames.length) {
      const n = pathNames.shift();
      const child = cur.children.find((c) => c.name === n);
      if (!child) {
        return [];
      }
      if (child instanceof MyFile) {
        if (!pathNames.length) {
          return [child.name];
        }
        return [];
      }

      cur = child;
    }

    const dirs = cur.children.map((c) => c.name);
    dirs.sort();
    return dirs;
  }

  mkdir(path: string): void {
    const pathNames = path.split("/").slice(1);
    let cur = this.root;
    let curPath = [""];
    while (pathNames.length) {
      const n = pathNames.shift() || "";
      curPath.push(n);
      const child = cur.children.find((c) => c.name === n);

      if (!child) {
        let newDir = new MyDirectory(n, curPath.join("/"), []);
        cur.children.push(newDir);
        cur = newDir;
      } else if (child instanceof MyDirectory) {
        cur = child;
      } else {
        break;
      }
    }
  }

  addContentToFile(filePath: string, content: string): void {
    const pathNames = filePath.split("/").slice(1);
    let cur = this.root;
    let curPath = [""];
    while (pathNames.length) {
      const n = pathNames.shift() || "";
      curPath.push(n);

      const child = cur.children.find((c) => c.name === n) as
        | MyFile
        | MyDirectory
        | undefined;

      if (!child) {
        if (!pathNames.length) {
          let newFile = new MyFile(n, curPath.join("/"), content);
          cur.children.push(newFile);
        }
        break
      } else if (child instanceof MyDirectory) {
        cur = child;
      } else if (child instanceof MyFile && !pathNames.length) {
        child.contents += content
        break;
      }
    }
  }

  readContentFromFile(filePath: string): string {
    const pathNames = filePath.split("/").slice(1);
    let cur = this.root;
    while (pathNames.length) {
      const n = pathNames.shift();
      const child = cur.children.find((c) => c.name === n) as
        | MyFile
        | MyDirectory
        | undefined;

      if (!child) {
        return "";
      } else if (child instanceof MyDirectory) {
        cur = child;
      } else if (child instanceof MyFile) {
        return child.contents || "";
      }
    }

    return "";
  }
}
