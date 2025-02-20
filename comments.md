## Decisões Técnicas

Para a configuração do projeto, optei por utilizar o Vite devido à sua rapidez no setup e à excelente experiência de desenvolvimento que proporciona. Essa escolha eliminou a necessidade de configurar um servidor via Express, além de dispensar a configuração manual de watchers e hot reloads.

O projeto foi iniciado com o seguinte comando:

```sh
yarn create vite my-vue-app --template vanilla
```

Decidi não utilizar frameworks como Vue.js ou React para ter maior liberdade na experimentação e estruturar a aplicação da forma mais enxuta possível.

## Estrutura do Projeto

Para garantir organização e separação clara de responsabilidades, defini a seguinte estrutura de pastas:

```
📂 src
┃ ┣ 📂api
┃ ┣ 📂components
┃ ┣ 📂mappers
┃ ┣ 📂styles
┃ ┣ 📂utils
📂 tests
```

## Requerimentos

A divisão das funcionalidades foi estruturada em must-have e nice-to-have, facilitando a priorização de tarefas. Para acompanhar o progresso, criei o arquivo tasks.md, onde as etapas são registradas e monitoradas.

## Testes

Para garantir a qualidade do código e a integridade das funcionalidades, implementei testes unitários em arquivos-chave, como os mappers e utils. Essa abordagem assegura que as principais funções do projeto sejam confiáveis e possam ser validadas de forma automatizada.
