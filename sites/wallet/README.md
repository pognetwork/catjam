# Pog.network Wallet

This folder contains the pog.network wallet application. The general pourpose of it is to let users interact with the pog.network crypocurrency by snding tokens to other users and interacting with decentralized applications.

## Basic Functionality

The following contains a general overview, for more detailed explainations check out [pog.network/specification](https://pog.network/specification)

The general process is comparable with the standard model of a website talking to a server, however in our case we don't actually trust the server. Since this application is sending around actuall currency, we can't afford to leak any sensiive information.

This is where the whole cryptocurrency aspect comes in: Your private key (you can think of this as your password) never actually leaves your computer and is send to someone, instead we use it with public/private key encryption to digitally sign messages.

### Loading a wallet ("signing in")

When loading a wallet, users will have a variety of formats to choose from, beginning with using a key file. This file (which was generated in the previous step) has to be decrypted using a password which the user also has to provide. This decryption is done using the same exact code used by the pog.network wallet software which is also provided as a webassembly module.

Once the wallet has been loaded and (possibly) decrypted, the private key backing this wallet is stored in the browsers session storage, which results in it being deleted once the browser window is closed again.

### Generating a wallet ("signing up")

Creation of wallets works similar to loading them, here we're generating and encryption the private key by using the same webassembly module like earlier.

Later, multiple other options to load and create a private key will be provided, like using hardware wallets, however these depend on the maturity of the rest of the ecosystem surrounding this cryptocurrency.

### Sending transactions

Now comes he fun part. When the user wants to create a new transaction, we have to intereact with the rest of the network.

Here, we connect using a gRPC API to any node in the network - remember: we're never transmiting sensitive information to anyone - which will help us query the blockchain ("database") and send new transactions.

Using this API, we request the required data to generat a new block (e.g account height). Using this, we create a new block (using the pog protocol buffer schema) and cryptographically sign it with our private key.

This block is then transmited to the node we're connected to which inturn will forward it to the rest of the network, which will then verify it and include it in your account chain.
