const axios = require('axios')
const Service = require('../models/Service')

class HealthCheckController
{
    async sendHttpRequest(req, res, next) {
        let inputs = req.body
        let uri = inputs.uri || ''
        let method = (inputs.method || '').toLowerCase()
        let header = inputs.header || {}
        let query = inputs.query || {}
        let body = inputs.body || {}

        if (!['options', 'get', 'head', 'put', 'post', 'delete', 'patch'].includes(method)) {
            return res.status(422).json({
                success: false,
                status: 422,
                data: {
                    message: 'Unknown HTTP/HTTPS method',
                },
            })
        }

        try {
            let response = await axios({
                method: method,
                url: uri,
                header: header,
                params: query,
                data: body,
            })
            let responseData = response.data || response

            return res.json({
                success: true,
                status: response.status || 200,
                data: responseData,
            })
        } catch (err) {
            let errResponseData = err.response && err.response.data || err

            return res.json({
                success: false,
                status: err.response && err.response.status || 500,
                data: errResponseData,
            })
        }
    }

    async listServiceInfo(req, res, next) {
        try {
            let services = await Service.findAll()

            return res.json({
                success: true,
                data: services,
            })
        } catch (err) {
            console.error(err)

            return res.status(500).json({
                success: false,
                data: null,
            })
        }
    }

    async storeServiceInfo(req, res, next) {
        let inputs = req.body
        let uri = inputs.uri || ''
        let method = (inputs.method || '').toLowerCase()
        let header = inputs.header || {}
        let query = inputs.query || {}
        let body = inputs.body || {}

        if (!['options', 'get', 'head', 'put', 'post', 'delete', 'patch'].includes(method)) {
            return res.status(422).json({
                success: false,
                status: 422,
                data: {
                    message: 'Unknown HTTP/HTTPS method',
                },
            })
        }

        let data = {
            uri, method, header, query, body,
        }

        try {
            let service = await Service.create(data)

            return res.json({
                success: true,
                data: service,
            })
        } catch (err) {
            console.error(err)

            return res.status(500).json({
                success: false,
                data: null,
            })
        }
    }

    async showServiceInfo(req, res, next) {
        let id = req.params.id

        try {
            let service = await Service.findByPk(id)

            if (!service) {
                return res.status(404).json({
                    success: false,
                    data: null,
                })
            }

            return res.json({
                success: true,
                data: service,
            })
        } catch (err) {
            console.error(err)

            return res.status(500).json({
                success: false,
                data: null,
            })
        }
    }

    async updateServiceInfo(req, res, next) {
        let id = req.params.id

        let inputs = req.body
        let uri = inputs.uri || ''
        let method = (inputs.method || '').toLowerCase()
        let header = inputs.header || {}
        let query = inputs.query || {}
        let body = inputs.body || {}

        if (!['options', 'get', 'head', 'put', 'post', 'delete', 'patch'].includes(method)) {
            return res.status(422).json({
                success: false,
                status: 422,
                data: {
                    message: 'Unknown HTTP/HTTPS method',
                },
            })
        }

        let data = {
            uri, method, header, query, body,
        }

        try {
            let service = await Service.findByPk(id)

            if (!service) {
                return res.status(404).json({
                    success: false,
                    data: null,
                })
            }

            service = await service.update(data)

            return res.json({
                success: true,
                data: service,
            })
        } catch (err) {
            console.error(err)

            return res.status(500).json({
                success: false,
                data: null,
            })
        }
    }

    async deleteServiceInfo(req, res, next) {
        let id = req.params.id

        try {
            let service = await Service.findByPk(id)

            if (!service) {
                return res.status(404).json({
                    success: false,
                    data: null,
                })
            }

            await service.destroy({
                force: true,
            })

            return res.json({
                success: true,
                data: service,
            })
        } catch (err) {
            console.error(err)

            return res.status(500).json({
                success: false,
                data: null,
            })
        }
    }
}

module.exports = HealthCheckController
