import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import log from '../src/components/log.js';
import home from '../src/components/home.js';
import search from '../src/components/search.js';
import news from '../src/components/news.js';

export default (
    <Switch>

        < Route component = { log } path = '/' exact />
        < Route component = { home } path = '/home' />
        < Route component = { search } path = '/search' />
        < Route component = { news } path = '/news' />
    
    </Switch>
)