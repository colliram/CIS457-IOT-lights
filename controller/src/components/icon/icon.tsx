import { Component, Prop, h } from '@stencil/core'
import Lightbulb from '../../icons/lightbulb.svg'
import Settings from '../../icons/settings.svg'
import Thermometer from '../../icons/thermometer.svg'
import { IconKind, IconSize } from './icon-storage'

@Component({
    tag: 'icon-inlay',
    styleUrl: 'icon.scss',
    shadow: false
})

export class Icon {

    @Prop({ reflect: true }) public clickEvent?: () => void
    @Prop({ reflect: true }) public size?: IconSize
    @Prop({ reflect: false }) public kind!: IconKind

    public render() {
        const icon = this.findSymbol()
        const classes = this.size ? `icon--${this.size}` : 'icon--medium'
        return (
            <div class={classes} innerHTML={icon} onClick={this.clickEvent} />
        )
    }

    private findSymbol = () => {
        switch (this.kind) {
            case IconKind.Lightbulb:
                return Lightbulb
            case IconKind.Settings:
                return Settings
            case IconKind.Thermometer:
                return Thermometer
            default:
                return Lightbulb
        }
    }
}

