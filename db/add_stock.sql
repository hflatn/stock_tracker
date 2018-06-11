
INSERT INTO stock(userbase_id, symbol, quantity) 
    SELECT $1, $2, $3
WHERE NOT EXISTS (
    SELECT 1 from stock WHERE symbol= $2 and userbase_id = $1
)
returning * 