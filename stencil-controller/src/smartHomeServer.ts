import * as dgram from 'dgram'
import { TcpService } from '../src/smartHomeTcpService'

export class SmartHomeServer {
    private socket: dgram.Socket
    private address: string
    private udpPort: number
    private tcpPort: TcpService

    public constructor(address: string = '127.0.0.1', port: number = 8888) {
        this.socket = dgram.createSocket('udp4')
        this.address = address
        this.udpPort = port
        this.tcpPort = new TcpService()
    }

    public command<TRequest>(request: TRequest): Promise<any> {
        console.log("pinged", request)
        var message = request ? this.processCommandString(JSON.stringify(request)) : ' '
        this.tcpPort.connect(message)

        return new Promise((resolve, reject) => {
            const message = JSON.stringify(request)
            this.socket.send(message, this.udpPort, this.address, (err) => {
                if (err) {
                    reject()
                    return
                }
            })

            const error = (err: Error) => {
                this.socket.removeListener('error', error)
                reject(err)
            }

            const receive = (buffer: Buffer) => {
                this.socket.removeListener('error', error)
                this.socket.removeListener('message', receive)
                const data = JSON.parse(buffer.toString())
                resolve(data)
            }

            this.socket.once('error', error)
            this.socket.once('message', receive)
        })
    }

    private processCommandString(message: string) {
        return message.substring(8, message.length - 2)
    }
}