require('../config/env')

const axios = require('axios')
const kue = require('kue')
kue.redis.createClient = function() {
    var client = redis.createClient(process.env.REDIS_SV_PORT || 6379, process.env.REDIS_SV_URI || '127.0.0.1')

    return client
}
const queue = kue.createQueue()
var job = queue.create('health_check', {})
    .save(err => {
        if (!err) {
            console.log('OK')
            console.log(`Job with id ${job.id} resulted in success`)
        } else {
            console.error('Not OK')
            console.error(`Job with id ${job.id} resulted in failure`)
            console.error(err)
        }
    })

const Service = require('../models/Service')

queue.process('health_check', 1, async (job, done) => {
    let services = await Service.findAll()
    services = services.map(element => element.dataValues)  
    services.forEach(async service => {
        try {
            let response = await axios({
                method: service.method,
                url: service.uri,
                header: service.header,
                params: service.query,
                data: service.body,
            })
            let responseData = response.data || response

            console.log(responseData)
        } catch (err) {
            let errResponseData = err.response && err.response.data || err

            console.error(errResponseData)
        }
    })

    done()
})
