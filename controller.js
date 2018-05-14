module.exports = {

    addstock: (req, res) => {
        const db = req.app.get('db');
        const { tickerName, tickerQuantity } = req.body
        db.add_stock([req.session.passport.user, tickerName, tickerQuantity])
        .then(() => res.status(200).send())
        .catch((err) => {
            (console.log(err, "add stock error"))
            res.status(500).send()
        })
    },

    checkstock: (req, res) => {
        const db = req.app.get('db');
        const { tickerName, tickerQuantity } = req.body
        db.check_stock([req.session.passport.user, tickerName])
        .then((stock) => res.status(200).send(stock))
        .catch((err) => {
            (console.log(err, "check stock error"))
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
        .then(() => {
            res.status(200).send()
        })
        .catch((err) => {
            (console.log(err, "delete stock error"))
            res.status(500).send(err)
        })
    },

    updatestock: ( req, res ) => {

        const db = req.app.get('db');
        const { symbol, newquantitystring } = req.body 
        console.log(quant)
        db.update_stock([req.session.passport.user, symbol, newquantitystring])
        .then((stock) => {
            res.status(200).send(stock)
        })
        .catch((err) => {
            (console.log(err, "update stock error"))
            res.status(500).send(err)
        })
    },
}
