export class WebSocketClient {

    private address: string
    private webSocket: WebSocket

    public constructor() {
        this.address = 'ws://demos.kaazing.com/echo'
        this.webSocket = new WebSocket(this.address)
        this.connect()
    }

    private connect() {
        if (this.webSocket){
            this.webSocket.onopen = () => {
                console.log("opened connection to smart light")
                this.webSocket.send('I have connected to you')
            }
            this.webSocket.onmessage = (message) => {
                console.log("received: ", message.data)
            }
            this.webSocket.onerror = (error) => {
                console.log("Error thrown: ", error)
            }
        }
    }

    private sendMessage = (message: string) => {
        this.webSocket!.send(message)
    }

    public toggleLightStatus = (status: boolean) => {
        this.sendMessage(`powerToggle ${status}`)
    }

    public toggleDimStatus = (status: boolean) => {
        this.sendMessage(`dimToggle ${status}`)
    }
}