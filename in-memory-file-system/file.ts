export default class MyFile {
  name: string;
  path: string;
  contents?: string;
  size?: number

  constructor(name: string, path: string, contents?: string, size?: number) {
    this.name = name;
    this.path = path;
    this.contents = contents;
    this.size = size
  }
}
