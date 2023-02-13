import persistBulkCache from "./lib/cache";

const  persistRedisData = (i) => {
  setTimeout(async () => {
    await persistBulkCache();
    persistRedisData(++i);
  }, 5000)
}

persistRedisData(0);

let i = 0;
setInterval(() => {
  console.log('Persistence services n:', i++);
}, 5000)
