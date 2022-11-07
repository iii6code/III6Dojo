# DOJO v2.22.10

![image](./public/images/theDojoSignet.png)

> @title : DOJO v2.22.10

> @author : stereoIII6

> @opSec co-author : xnode

> @frontEnd co-author : SirHeeb

> @company : flashLAB Inc, III6 Ltd, DIAS by flashLAB Inc

> @emails : stereo@dojo.guru, xnode@dojo.guru, sirHeeb@dojo.guru

> @devwebsite : https://dev.dojo.guru

> @about : DOJO is a development framework that allows blockchain projects to spin up, develop and launch dynamic NFT collectibles and web3 social communities in no time. It is compliant to the decentralised interactive asset standard (DIAS), wich allows dynamic assets to be built on multiple layers and let layers react to changes that occur via real world data feeds.

> @devtech : truffle, solidity, javascript, json, html, css, sass

## Software Requirements

> NodeJS@17 & NPM@8

> Git@2

> Trufflle@5

> Firefox or Brave Browser & Metamask Extension

You should be ready to go !

## Installation

Once you have everything installed :

> Install Truffle `npm i -g truffle`

> Create a directory `mkdir ROOT_DIR`

> navigate into it `cd ROOT_DIR`

> clone the repo into the directory `git clone .`

> Install Repo Dependencys and Node Modules `npm i`

> fix webpack issues type `export NODE_OPTIONS=--openssl-legacy-provider` in root dir this step might have to be repeated after restarting your production environment

## Initialization

> You will need to open `.env.conf` and edit the seedphrase, admin address &

> Your private infura api code from https://infura.io needs to be added inside

> finally save the file as `.env` in the root dir and include `.env` to your `.gitignore` file.

> :: CAUTION : make sure not to leave sensitive data in any file but `.env`. In production these values will have to be hidden server vars. Only use Mumbai Testnetwork until you know what you are doing. Be cautionate about which seedphrase and admin account you intend to use for which project to protect your funds. ::

> Then you will need to compile and migrate the contracts `npm run migrate:<network>` you can choose from main, polygon, mumbai, optimism & arbitrum to migrate the contracts onto the wanted chain/s.

## Operation

> Run project in local environment `npm run dev` in root directory from terminal.

> You will be kicked to -> `http://localhost:8080` automatically.

> If you edit the sourcecode your Server automatically updates the website on save.

> Check out `https://dojo.guru` to find out how to develop your boilerplate dapp.
