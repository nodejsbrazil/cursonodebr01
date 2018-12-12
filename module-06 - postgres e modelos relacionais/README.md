# Módulo 5 - Bancos de Dados - Nosso projeto Multi-banco de dados

- Trabalhando com o padrão Strategy para Multi DataSources

## Instalando docker para usar o MongoDB e Postgres

```shell

docker run \
    --name postgres \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_USER=erickwendel \
    -e POSTGRES_DB=herois \
    -p 5432:5432 \
    -d \
    postgres

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer





docker run -it \
 -p 5432:5432 \
 --link postgres:postgres \
 postgres psql -h $HOST -p $PORT -U $USER $DATABASE

```

- Go to `http://localhost:8080/?pgsql=postgres&username=postgres&db=heroes&ns=public`