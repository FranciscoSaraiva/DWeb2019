## 1.) Listar gêneros de filmes e indicar quantos há de cada um
```
db.movies.aggregate([
    {$group: {_id: "$genres", numFilmes: {$sum: 1}}},
    {$sort: {numFilmes: -1} }
])
```

## 2.) Quais os títulos dos filmes do gênero "Drama"
```
db.movies.find(
 {genres: {$all: ["Drama"]}},
 {_id: 0, title: 1}
)

-------

db.movies.aggregate([
    {$match: {genres: {$all: ["Drama"]}}},
    {$project: {_id:0, title: 1}},
    {$unwind: "$title"},
    {$group: {_id: "$title"}}
])
```

## 3.) Que atores participaram em filmes do gênero "Comedy"?
```
db.movies.aggregate([
    {$match: {genres: {$all: ["Comedy"]}}},
    {$project: {_id: 0, cast: 1}},
    {$unwind: "$cast"},
    {$group: {_id: "$cast"}}
])
```

