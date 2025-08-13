const BUCKET_SIZE = 2069;
type Pairs = number[];
type Bucket = Pairs[];

export default class MyHashMap {
  map: Bucket[];
  constructor() {
    this.map = Array.from({ length: BUCKET_SIZE }, () => []);
  }

  put(key: number, value: number): void {
    const addr = key % BUCKET_SIZE;
    let bucket = this.map[addr];
    let found = false;
    for (let i = 0; i < bucket.length; i++) {
      let [k, v] = bucket[i];
      if (k === key) {
        bucket[i] = [key, value];
        found = true;
        break;
      }
    }

    if (!found) {
      bucket.push([key, value]);
    }
  }

  get(key: number): number {
    const addr = key % BUCKET_SIZE;
    const bucket = this.map[addr];
    for (let [k, v] of bucket) {
      if (k === key) {
        return v;
      }
    }
    return -1;
  }

  remove(key: number): void {
    const addr = key % BUCKET_SIZE;
    const bucket = this.map[addr];
    let len = bucket.length;
    for (let i = 0; i < len; i++) {
      let [k, v] = bucket[i];
      if (k === key) {
        bucket.splice(i, 1);
        break;
      }
    }
  }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
