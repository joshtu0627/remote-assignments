var request = require("sync-request");
const url =
  "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";
function requestSync(url) {
  // write code to request url synchronously
  const startTime = Date.now();
  const res = request("GET", url);
  console.log(JSON.parse(res.getBody("utf8")));
  const endTime = Date.now();
  console.log(`Execution time: ${endTime - startTime} ms`);
}

const totalStartTime = Date.now();
requestSync(url); // would print out the execution time
requestSync(url);
requestSync(url);
const totalEndTime = Date.now();
console.log(`total execution time: ${totalEndTime - totalStartTime} ms`);
