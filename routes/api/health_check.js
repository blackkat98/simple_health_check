const HealthCheckController = require('../../controllers/HealthCheckController')
const healthCheckController = new HealthCheckController()
const AuthMiddleware = require('../../middlewares/Auth')

module.exports = (app, multipartParser) => {
    app.post('/send_http_request', [AuthMiddleware], healthCheckController.sendHttpRequest)

    app.get('/services', [AuthMiddleware], healthCheckController.listServiceInfo)
    app.post('/services', [AuthMiddleware], healthCheckController.storeServiceInfo)
    app.get('/services/:id', [AuthMiddleware], healthCheckController.showServiceInfo)
    app.put('/services/:id', [AuthMiddleware], healthCheckController.updateServiceInfo)
}
