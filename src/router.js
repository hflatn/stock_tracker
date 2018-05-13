import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import log from '../src/components/log.js';
import home from '../src/components/home.js';

export default (
    <Switch>

        < Route component = { log } path = '/' exact />
        < Route component = { home } path = '/home' />
    
    </Switch>
)