import { Component, State, h, Event, EventEmitter } from '@stencil/core'
import { NavDestination } from './interface'
import { IconKind } from '../icon/icon-storage'

@Component({
    tag: 'nav-panel',
    styleUrl: 'navigation.scss',
    shadow: true
})

export class Navigation {

    @State() private destination: string = ''
    @Event() private clicked!: EventEmitter

    public render() {
        return (
            <div>
                <div class="navigation__options">
                    <div class="navigation__icon">
                        <icon-inlay kind={IconKind.Lightbulb} size='medium' clickEvent={this.handleClick({ destination: "lights" })} />
                    </div>
                    <div class="navigation__icon">
                        <icon-inlay kind={IconKind.Settings} size='medium' clickEvent={this.handleClick({ destination: "settings" })} />
                    </div>
                </div>
                <nav-border />
            </div>
        )
    }

    protected handleClick(dest: NavDestination) {
        return () => {
            console.log("clicked the nav")
            if (this.destination === dest.destination) {
                return
            }
            this.destination = dest.destination
            this.clicked.emit({
                destination: this.destination
            })
        }
    }
}
