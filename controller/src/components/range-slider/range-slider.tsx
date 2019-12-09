import { Component, State, h, Event, EventEmitter } from '@stencil/core'

@Component({
    tag: 'range-slider',
    styleUrl: 'range-slider.scss',
    shadow: true
})

export class RangeSlider {

    @State() sliderValue: number = 50

    public render() {
        return (
            <div class="slidecontainer">
                <input type="range" min="1" max="100" value={this.sliderValue} onChange={this.handleUpdateRange} class="range-slider" />
            </div>
        )
    }

    private handleUpdateRange = () => {
            this.sliderValue = 20
    }
}