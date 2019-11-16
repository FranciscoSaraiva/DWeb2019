# TP8
### API para prémios Nobel
### Exercício 1 da seguinte [ficha](http://www4.di.uminho.pt/~jcr/AULAS/didac/RepFichas/site/fichas/dweb2019-e2.html)

>Criar um servidor nodejs que dê suporte à seguinte API de dados (note que não é necessário qualquer interface web)

### Rotas

| Request | Route                              | Description                                                                                                                         |
| :------ | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| GET     | /api/prizes                        | Devolve a lista de prémios apenas com os campos "year" e "category"                                                                 |
| GET     | /api/prizes/:id                    | Devolve a informação completa de um prémio                                                                                          |
| GET     | /api/categories                    | Devolve a lista de categorias, sem repetições                                                                                       |
| GET     | /api/prizes?categoria=YYY          | Devolve a lista de prémios que tenham o campo "category" com o valor "YYY"                                                          |
| GET     | /api/prizes?category=YYY&date=AAAA | Devolve a lista de prémios que tenham o campo "category" com o valor "YYY" e o campo "year" com um valor superior a "AAAA"          |
| GET     | /api/laureates                     | Devolve uma lista ordenada alfabeticamente por nome dos laureados com os campos correspondentes ao nome, ano do prémio e categoria. |


## Instruções:

Importar o ficheiro prize.json para o MongoDB com o seguinte comando:
```
mongoimport --db tp8 --collection nobels --file nobels.json --jsonArray
```

Servidor a correr em **localhost:3000**

## Estrutura API

```
{
    "Request": {
        "Request": "", (O pedido efetuado à API)
        "Message": "", (Descrição do pedido efetuado)
        "Status": 200 (Status do pedido)
    },
    "Data": {} (array ou objecto retornado dependendo do pedido)
}
```

## Exemplo estrutura API

```
{
    "Request": {
        "Request": "Get prize with id: 5dc3475c48942c99418edbdc",
        "Message": "Prize retrieved",
        "Status": 200
    },
    "Data": {
    "_id": "5dc3475c48942c99418edbdc",
    "year": "2016",
    "category": "peace",
    "laureates": [
        {
            "id": "934",
            "firstname": "Juan Manuel",
            "surname": "Santos",
            "motivation": "\" 50-year-long civil war to an end\"",
            "share": "1"
        }
    ]
    }
}
```