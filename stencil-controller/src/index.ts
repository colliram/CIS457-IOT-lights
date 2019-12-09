import * as express from 'express'
import * as cors from 'cors'
import { SmartHomeServer } from './smartHomeServer'

const ip = '192.168.86.99'
const app = express()
const homeHub = new SmartHomeServer(ip)

app.use(cors())
app.use(express.json())

app.get('/', (_, response) => {
    response.status(200).send('hello')
})

app.post('/command', async (request, response) => {
    const res = await homeHub.command(request.body)
    if (res.error) {
        response.status(500).send(res)
    }
    else {
        response.status(200).send(res)
    }
})

app.listen(8080, () => {
    console.log('[hub] relay listening')
})