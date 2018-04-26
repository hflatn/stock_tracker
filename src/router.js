import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import log from '../src/login/log.js';

export default (
    <Switch>

        < Route component = { log } path = "/" exact />
    
    </Switch>
)