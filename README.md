[![Netlify Status](https://api.netlify.com/api/v1/badges/8d3fae14-1136-4a30-8224-f5602a5a2360/deploy-status)](https://app.netlify.com/sites/staging-dev-portal/deploys)

# Cardano Developer Portal

Welcome to the Cardano Developer Portal. To make the difference between Cardano mainnet functionality and testnet functionality clearer, we moved the old content of developers.cardano.org to testnets.cardano.org with the launch of this developer portal.

We wanted to build an open and inclusive, easy to use developer portal that offers guidance and allows community contribution. To achieve this we have chosen [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

Please find a detailed installation guide on [developers.cardano.org/docs/portal-contribute/](https://developers.cardano.org/docs/portal-contribute/). 


## Requirements:  

[Node.js](https://nodejs.org/en/download/) version >= 14.0  
[Yarn](https://yarnpkg.com/en/) version >= 1.5  
On macOS you also need Xcode and Command Line Tools.


## Clone the repo

```console
git clone https://github.com/cardano-foundation/developer-portal.git
```

## Navigate into the folder

```console
cd developer-portal
```

## Install all dependencies

```console
yarn install
```

## Production build 

Create at least once a production build (as this pulls missing files)

```console
yarn build
```

## Local development

```console
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Project structure 

Please find the project structure and more detailed information on [developers.cardano.org/docs/portal-contribute/](https://developers.cardano.org/docs/portal-contribute/#project-structure).
