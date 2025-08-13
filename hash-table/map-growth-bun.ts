// map-growth-bun.ts
// Run with: bun run map-growth-bun.ts

function estimateBuckets() {
  const m = new Map();
  const results: { size: number; buckets: number }[] = [];

  // We'll detect resizes by looking for sudden drops in average lookup time
  const timings: number[] = [];
  let lastTime = 0;

  for (let i = 0; i < 2000; i++) {
    m.set(`key${i}`, i);

    // Measure lookup time for a known key
    const start = performance.now();
    m.get(`key${Math.floor(i / 2)}`);
    const elapsed = performance.now() - start;

    timings.push(elapsed);

    // Every few inserts, check if average time dropped — likely means resize happened
    if (i > 4 && i % 2 === 0) {
      const avg = timings.reduce((a, b) => a + b, 0) / timings.length;
      if (lastTime && avg < lastTime * 0.6) {
        // Heuristic: significant drop → resize occurred
        const guessBuckets = Math.pow(2, Math.ceil(Math.log2(i * 1.33)));
        results.push({ size: i, buckets: guessBuckets });
      }
      lastTime = avg;
      timings.length = 0;
    }
  }

  return results;
}

console.table(estimateBuckets());
