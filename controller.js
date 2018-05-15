module.exports = {

    addstock: (req, res) => {
        const db = req.app.get('db');
        const { tickerName, tickerQuantity } = req.body
        db.add_stock([req.session.passport.user, tickerName, tickerQuantity])
        .then(([stock]) => { 
            console.log(stock,"addstock res")
            res.status(200).send(stock)}
        
    )
        .catch((err) => {
            (console.log(err, "add stock error"))
            res.status(500).send()
        })
    },

    getstocks: ( req, res ) => {

        const db = req.app.get('db');
        db.get_stocks([req.session.passport.user])
        .then((stock) => {
            res.status(200).send(stock)
        })
        .catch((err) => {
            (console.log(err, "get stock error"))
            res.status(500).send(err)
        })
    },

    deletestock: ( req, res ) => {
        const db = req.app.get('db');
        const { stock_symbol } = req.body 
        console.log( req.session.passport.user, req.body, "delete stock info")
        db.delete_stock([req.session.passport.user, stock_symbol])
        .then((stock) => {
            res.status(200).send(stock)
        })
        .catch((err) => {
            (console.log(err, "delete stock error"))
            res.status(500).send(err)
        })
    },

    updatestock: ( req, res ) => {

        const db = req.app.get('db');
        const { symbol, newquantitystring } = req.body 
        db.update_stock([req.session.passport.user, symbol, newquantitystring])
        .then((stock) => {
            res.status(200).send(stock)
        })
        .catch((err) => {
            (console.log(err, "update stock error"))
            res.status(500).send(err)
        })
    },

    searchhistory: ( req, res ) => {

        const db = req.app.get('db');
        const { tickerName } = req.body 
        db.search_history([req.session.passport.user, tickerName])
        .then((stock) => {
            res.status(200).send(stock)
        })
        .catch((err) => {
            (console.log(err, "search history"))
            res.status(500).send(err)
        })
    },

    allhistory: ( req, res ) => {

        const db = req.app.get('db');
        db.all_history([])
        .then((stock) => {
            res.status(200).send(stock)
        })
        .catch((err) => {
            (console.log(err, "all history"))
            res.status(500).send(err)
        })
    },

    signout: (req, res, next) => {
        const { session } = req;
        session.destroy()
        res.status(200).send(req.session);
    }
}
