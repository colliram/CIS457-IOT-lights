import { Component, State, h, Event, EventEmitter } from '@stencil/core'
import { SmartHomeClient } from '../../client/smartHomeClient'

export interface Color {
    name: string
    active: boolean
}

@Component({
    tag: 'lights-view',
    styleUrl: 'lights-view.scss',
    shadow: true
})

export class LightsView {

    @State() private mainPower: boolean = false
    @State() private dimMode: boolean = false
    @State() private red: Color | null = null
    @State() private blue: Color | null = null
    @State() private green: Color | null = null
    @Event() private values!: EventEmitter

    private homeClient: SmartHomeClient | null = null

    public componentDidLoad() {
        this.homeClient = new SmartHomeClient()
        this.red = {
            name: 'red',
            active: true
        }
        this.blue = {
            name: 'blue',
            active: true
        }
        this.green = {
            name: 'green',
            active: true
        }
    }

    public componentDidUnload() {
        this.values.emit({
            power: this.mainPower,
            dimMode: this.dimMode
        })
    }

    public render() {
        return (
            <div class="lights-view">
                <div class="lights-view__options">
                    <h2>Power</h2>
                    <toggle-switch param="Power" onClick={this.toggleLightState}
                        state={this.mainPower} shape='round' class="lights-view__power-button" />
                </div>
             <div class="lights-view__options">
                    <h2>Pulse Mode</h2>
                    <toggle-switch param="dimMode" onClick={this.togglePulseState}
                        state={this.dimMode} shape='round' class="lights-view__power-button" />
                </div>
                <div class="lights-view__options">
                <h2>Red</h2>
                    <toggle-switch param="red" onClick={this.toggleColor(this.red!)}
                        state={this.red!.active} shape='round' class="lights-view__power-button" />
                </div>
                <div class="lights-view__options">
                <h2>Green</h2>
                    <toggle-switch param="green" onClick={this.toggleColor(this.green!)}
                        state={this.green!.active} shape='round' class="lights-view__power-button" />
                </div>
                <div class="lights-view__options">
                <h2>Blue</h2>
                    <toggle-switch param="blue" onClick={this.toggleColor(this.blue!)}
                        state={this.blue!.active} shape='round' class="lights-view__power-button" />
                </div>
            </div>
        )
    }

    public toggleLightState = () => {
        console.log("toggled power")
        this.mainPower = !this.mainPower
        this.homeClient!.toggleLightStatus()
    }

    public togglePulseState = () => {
        console.log("toggled pulse mode")
        this.dimMode = !this.dimMode
        this.homeClient!.togglePulseMode()
    }

    public toggleColor = (color: Color) => {
        return () => {
            console.log(`toggled ${color.name}`)
            color.active = !color.active
            this.homeClient!.toggleColor(color.name)
        }
    }
}