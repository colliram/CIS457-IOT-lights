import { Component, Prop, h} from '@stencil/core'

@Component({
    tag: 'head-banner',
    styleUrl: 'header.scss',
    shadow: true
})

export class Banner {

    @Prop({ reflect: true }) public dirty!: boolean
    @Prop({ reflect: true }) public locked!: boolean

    public render() {
        return (
                    <h2>CIS 457 Web Server</h2>
        )
    }
}
