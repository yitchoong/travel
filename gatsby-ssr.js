/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react'

import Transition from './src/components/transition'
import Layout from './src/components/layout'
export {wrapRootElement} from './src/providers'
export const wrapPageElement = ({element, props}) => {
    return (
        <Transition {...props}>
            <Layout {...props}>
                {element}
            </Layout>
        </Transition>
    )
}
