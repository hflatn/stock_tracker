import React from 'react';
import { Route, Switch} from 'react-router-dom';
import log from '../src/components/log.js';
import home from '../src/components/home.js';
import search from '../src/components/search.js';
import news from '../src/components/news.js';
import userSymbol from '../src/components/userSymbol.js';

export default (
    <Switch>

        < Route component = { log } path = '/' exact />
        < Route component = { home } path = '/home' />
        < Route component = { userSymbol } path = '/usersymbol/:symbol' />
        < Route component = { search } path = '/search' /> 
        < Route component = { news } path = '/news' />
    
    </Switch>
)