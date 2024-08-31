# Project Measure Bill

## Descrição

O **Project Measure Bill** é uma aplicação backend desenvolvida para o teste técnico da empresa Shopper.com.br. Este projeto foca na construção de um serviço que gerencia a leitura de consumo de água e gás a partir de imagens. Ele inclui três endpoints e uma integração com a API do Google Gemini para extrair informações de consumo de imagens de medidores.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js com TypeScript
- Prisma
- Docker
- PostgreSQL

## Instalação

1. **Crie o arquivo `.env`**

   Na raiz do projeto, crie um arquivo chamado `.env` e adicione as seguintes variáveis de ambiente:

   ```env
   # Porta do servidor
   PORT=8000

   # Configurações do banco de dados PostgreSQL
   POSTGRES_PASSWORD=docker
   POSTGRES_DB=prismaapi
   POSTGRES_USER=postgres

   # Variáveis de ambiente para o Prisma
   DATABASE_URL="postgresql://postgres:docker@db:5432/prismaapi"

   # Configurações da API Gemini
   GEMINI_API_KEY=
   MODEL_GEMINI="gemini-1.5-flash"

   # URL base do backend
   HOST_BACKEND="http://localhost:8000/images/"
   ```

    Preencha a variável `GEMINI_API_KEY` com a chave da API Gemini.

2. **Suba os serviços com Docker**

    Utilize o Docker para iniciar a aplicação e o banco de dados:

    ```
    docker-compose up
    ```

    Para parar os serviços, use:
    ```
    docker-compose down
    ```

## Rodando o Projeto Localmente

   Siga as instruções acima para iniciar os serviços com Docker. Certifique-se de ter o arquivo .env configurado corretamente antes de executar docker-compose up.

## Funcionalidades

   O serviço é responsável por:

- Gerenciar a leitura individualizada de consumo de água e gás.
- Utilizar a API do Google Gemini para extrair medições a partir de imagens de medidores.

`Nota`: O modelo Gemini Pro Vision está descontinuado, o que tem impactado a eficácia do sistema. Devido a essa descontinuidade, o sistema está em baixa e o projeto ainda não está totalmente correto.

## Testes

O projeto inclui alguns testes unitários. Para executá-los, use o comando:
```
npx jest
```

## Status do Projeto

O projeto está finalizado com as funcionalidades principais implementadas. No entanto, há planos para futuras atualizações, incluindo a adição de testes automatizados e melhorias na integração com a API Gemini.

## Contato 

Para mais informações sobre o projeto, entre em contato.
