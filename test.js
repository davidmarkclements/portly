var portly = require('./')

//to test: open a process on port 5858 (easy way node --debug-brk <some file>)
//or wait till the timeout to see it error

portly(5858, {timeout: 5000, detailed: true}).then(console.log).catch(console.error)