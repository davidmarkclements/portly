var Promise = require('lie')
var lsof = require('lsof')

module.exports = portly

function portly(port, opts) {
  opts = opts || {}
  opts.type = opts.type || 'tcp'
  opts.pollInterval = typeof opts.pollInterval === 'number' ? opts.pollInterval : 200
  opts.timeout = typeof opts.timeout === 'number' ? opts.timeout : Infinity
  opts.detailed = opts.detailed || false
  var lookup = opts.type === 'udp' ? 'rawUdpPort' : 'rawTcpPort'

  return new Promise(function (resolve, reject) {
    var p = retry()
    var timedout = false
    var to 
    function retry() {
      return new Promise(function (resolve, reject) {
        if (timedout) reject()
        lsof[lookup](port, resolve)
      }).then(function (data) {
        if (timedout) throw Error()
        data = data.filter(function (d) { return d.state === 'listen' })
        if (!data.length) return wait(opts.pollInterval).then(function () { 
          return new retry()
        })

        return data[0]
      })
    }

    p.then(function (d) {
      clearTimeout(to)
      resolve(opts.detailed ? d : d.pid)
    })

    if (opts.timeout < Infinity) {
      to = setTimeout(function () {
        timedout = true
        reject(Error('timeout (' + opts.timeout + ')')) 
      }, opts.timeout)
    }
  })
}

function wait(to) {
  return new Promise(function (resolve) {
    setTimeout(resolve, to)
  })
}