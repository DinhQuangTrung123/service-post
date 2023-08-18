var os = require('os');
var cluster = require('cluster');
var process = require('process');
const numCPUs = require('os').cpus().length;

console.log("++++++++++++") 
// console.log('LengthThreadPool::::', os.cpus().length)
// console.log('LengthThreadPool::::', os.cpus())
// console.log('LengthThreadPool::::', cluster)
// console.log('LengthThreadPool::::', process)

// console.log('LengthThreadPool::::', cluster.fork())

if (cluster.isMaster) {
  // masterProcess();\
  console.log('có')
} else {
  console.log('không')
}

for (let i = 0; i < numCPUs; i++) {
  console.log(`Forking process number ${i}...`);
  cluster.fork();
}
