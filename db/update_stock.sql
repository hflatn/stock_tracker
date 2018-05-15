update stock
set quantity = $3
where userbase_id = $1 and symbol = $2
returning *