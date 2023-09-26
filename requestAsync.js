const url =
  "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";
function requestCallback(url, callback) {
  // write code to request url asynchronously
  const startTime = Date.now();
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const endTime = Date.now();
      callback(`Execution time: ${endTime - startTime} ms`);
    });
}
function requestPromise(url) {
  // write code to request url asynchronously with Promise
  const startTime = Date.now();
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const endTime = Date.now();
      return `Execution time: ${endTime - startTime} ms`;
    });
}
async function requestAsyncAwait(url, totalStartTime) {
  // write code to request url asynchronously
  // you should call requestPromise here and get the result using async/await.
  const startTime = Date.now();
  const res = await fetch(url);
  console.log(await res.json());
  const endTime = Date.now();
  console.log(`Execution time: ${endTime - startTime} ms`);
  console.log(
    `requestAsync total execution time: ${endTime - totalStartTime} ms`
  );
}

const totalStartTime = Date.now();
requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url, totalStartTime);
