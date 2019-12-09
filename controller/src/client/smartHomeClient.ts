import axios, { AxiosInstance } from 'axios'

export interface HomeReport {
    lightOn: boolean
    dimMode: boolean
}

export class SmartHomeClient {

    private readonly http: AxiosInstance

    public constructor() {
        const url = `http://${window.location.hostname}:8080/`
        this.http = axios.create({
            // todo: configurable base url
            baseURL: url,
            timeout: 10000
        })
    }

    public async toggleLightStatus(): Promise<void> {
        await this.command('toggle_light_status', {})
    }

    public async togglePulseMode(): Promise<void> {
        await this.command('toggle_pulse_status', {})
    }

    public async toggleColor(color: string): Promise<void> {
        await this.command(`toggle_${color}`)
    } 

    private async command<TRequest, TResponse>(name: string, request?: TRequest): Promise<any> {
        const response = await this.http.post('command', {
            cmd: name,
            ...request
        })
        console.log("response", response)
        return response.data as TResponse
    }
}