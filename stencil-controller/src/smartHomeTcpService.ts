import * as net from 'net'

export class TcpService {

    public constructor() {
        this.connect()
    }

    public connect(message: string = 'Hello, server! Love, Client.') {
        const client = new net.Socket()
        client.connect(80, '10.0.0.101', function () {
            client.write(message);
        });

        client.on('data', function (data) {
            console.log('Received: ' + data);
            client.destroy(); // kill client after server's response
        });

        client.on('close', function () {
            console.log('Connection closed');
        });
    }
}