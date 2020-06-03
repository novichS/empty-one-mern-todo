import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TodosPage } from './pages/TodosPage';
import { EditPage } from './pages/EditPage';
import { AuthPage } from './pages/AuthPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Route path="/createit" exact>
                    <TodosPage />
                </Route>
                <Route path="/edit/:id">
                    <EditPage />
                </Route>
                <Redirect to="/home" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}