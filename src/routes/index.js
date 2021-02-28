import React from 'react'
import { Route, Switch } from 'react-router'
import Category from '../components/Category'
import Quiz from '../components/Quiz'
import Stats from '../components/Stats'

const routes = (
    <div>
        <Switch>
            <Route path="/quiz" component={Quiz} />
            <Route path="/stats" component={Stats} />
            <Route path="/" component={Category} />
        </Switch>
    </div>
)

export default routes