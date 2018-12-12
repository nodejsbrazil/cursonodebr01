# Modulo 3 - Introdução a desenvolvimento de testes automatizados

## Instalação (do zero)

- `npm i --save-dev mocha`
- `npm i axios`

## Objetivo

- Iniciar instalação e tomar prática de testes em todas aplicações
- Testar se o mapeamento aconteceu com sucesso
- Mock de requisições externas HTTP

## Comentarios

- Usamos o `nock` para Mockar requisições HTTP
- Requisições de terceiros, não podemos validar se está de pé, mas devemos validar caso os resultados venham conforme o esperado
- Com o `nock` qualquer requisição usando aquela `requisição` será `fakeado` e usaremos o valor de uma variavel definida por nós como resposta padrão
- Com ele podemos validar também possiveís erros com a função `replyWithError('DEU RUIM');`

## Rodando

- `npm i`
- `npm t`
