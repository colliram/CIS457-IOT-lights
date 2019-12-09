import { Component, h, Prop, Event, Listen, EventEmitter } from '@stencil/core'

export type Shape = 'round' | 'square'

@Component({
    tag: 'toggle-switch',
    styleUrl: 'toggle-switch.scss',
    shadow: true
})

export class ToggleSwitch {

    @Prop() public clickEvent?: () => void
    @Prop({ reflect: true }) public shape!: Shape
    @Prop({ reflect: true }) public state!: boolean
    @Prop({ reflect: true }) public param!: string

    public render() {
        if (this.shape === 'square') {
            return (
                <label class="switch">
                    <input type="checkbox" checked={this.state} />
                    <span class="slider"></span>
                </label>
            )
        }
        else {
            return (
                <label class="switch">
                    <input type="checkbox" checked={this.state} />
                    <span class="slider round"></span>
                </label>
            )
        }
    }
}