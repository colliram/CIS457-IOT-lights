import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { inlineSvg } from 'stencil-inline-svg'

export const config: Config = {
    namespace: 'app',
    globalStyle: 'src/global/index.scss',
    plugins: [
        inlineSvg(),
        sass({
            injectGlobalPaths: [
                'src/global/variables.scss',
                'src/global/mixins.scss',
                'src/global/universal.scss',
                'src/global/scss/variables.scss'
            ]
        })
    ],
    copy: [
        { src: 'images/background3.png', dest: 'images/background3.png'}
    ]
}