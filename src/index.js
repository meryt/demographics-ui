import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import registerServiceWorker from './registerServiceWorker'
import { history } from './store'
import store from './store'

import App from './App'

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Switch>
                    <Route exact path="/"><App/></Route>
                    <Route render={() => (<div>Miss</div>)} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()
