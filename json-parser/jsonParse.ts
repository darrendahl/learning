export default function jsonParse(str: string) {
  const stack = [];
  let i = 0;
  let curExp = "";
  let res = null;
  while (i < str.length) {
    if (str[i] === "{") {
      stack.push(str[i]);
    } else if (str[i] === "}") {
      if (stack[stack.length - 1] !== "{") {
        throw Error("Invalid JSON string");
      }

      let [key, val] = curExp.split(":");
      let k = key?.trim() as string;
      let v = val?.trim() as string;
      res = {
        [k.replace(/\"/g, '')]: v.replace(/\"/g, ''),
      };

      stack.pop();
      curExp = "";
    } else {
      curExp += str[i];
    }

    i++;
  }

  return res
}
