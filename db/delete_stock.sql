delete from stock 
where userbase_id = $1 and symbol = $2
returning * 