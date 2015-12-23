# portly

Wait for a port to open, associate it to a process, without blocking the port

## Signature

```js
portly(port, options) => Promise =>  pid
portly(port, options = {detailed:true}) => Promise => info
```

## Usage

ES5:

```js
var portly = require('portly')

portly(3000, {timeout: 5000})
  .then(function (pid) {
    console.log(pid, ' is using port 3000')
  })
  .catch(function (err) {
    console.error(err)
  })

```

ES6 + ES7:

```js
import portly from 'portly'

async function discover(port) {
  const pid = await portly(port)
  return pid
}

try { 
  console.log(discover(3000))
} catch (e) {
  console.error(e)
}
```

## Options

* **type** 'tcp' | 'udp' - default 'tcp'  - whether to look for a tcp or udp port
* **pollInterval** - default 200 - interval between port checks
* **timeout** - default Infinity - fail after given time
* **detailed** - default false - supplied PID if false, or full lsof info object if true

Full info object supplies the following:

```
{ state, command, pid, user, fd, type, device, 'size/off', node, name }
```

## Support

Node 0.10 to Node 5 inclusive supported.

OS X and Linux only for now. We use `lsof` to examine the ports
and get information about processes. PR's very welcome for Windows
support. 

## Thanks

* To [nearForm](http://nearform.com) for sponsoring

