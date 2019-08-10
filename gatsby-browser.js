/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'

import Transition from './src/components/transition'
import Layout from './src/components/layout'
import ErrorHandler from './src/components/error-handler'

export {wrapRootElement} from './src/providers'
export const wrapPageElement = ({element, props}) => {
    return (
        <Transition {...props}>
            <ErrorHandler>
                <Layout {...props}>
                    {element}
                </Layout>
            </ErrorHandler>
        </Transition>
    )
}
