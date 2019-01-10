import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import registerServiceWorker from './registerServiceWorker'
import configureStore, { history } from './store'

import App from './App'

const store = configureStore(/* provide initial state if any */)

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()
