select stock.symbol
from stock
inner join search on stock.symbol = search.searchedsymbol
