import { Component, Host, h, Listen, State } from '@stencil/core'

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.scss',
    shadow: true
})
export class AppRoot {

    @State() private path: string = 'lights'

    public componentDidLoad() {
        window.resizeTo(500, 300)
    }

    public render() {
        return (
            <Host>
                <head-banner dirty={false} locked={false} />
                <div class="body">
                    <nav-panel onClicked={ev => this.selectPage(ev)} />
                    {this.renderPage()}
                </div>
            </Host>
        )
    }

    @Listen('clicked')
    private renderPage() {
        if (!this.path) {
            return null
        }
        switch (this.path) {
            case 'lights':
                return (
                    <lights-view />
                )
            case 'settings':
                return (
                    <div></div>
                )
            default:
                return null
        }
    }

    private selectPage(event: CustomEvent) {
        if (event) {
            this.path = event.detail.destination
        }
    }
}