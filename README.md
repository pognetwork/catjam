<h1>
<img align="left" width="60" src="https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/3x">
 &nbsp;catJAM <a href="https://wallet.pog.network"><img src="https://img.shields.io/website?label=wallet&url=http%3A%2F%2Fwallet.pog.network"></a>&nbsp;<a href="https://img.shields.io/security-headers?url=http%3A%2F%2Fwallet.pog.network%2F"><img src="https://img.shields.io/security-headers?url=https%3A%2F%2wallet.pog.network%2F&followRedirects=on"></a>&nbsp;<a href="https://observatory.mozilla.org/analyze/develop--wallet.pog.network"><img src="https://img.shields.io/mozilla-observatory/grade/wallet.pog.network?publish"></a>
</h1>
<br/>

> The catJAM project contains all JAM Stack based (Javascript-API-Markup) `React` applications used across all pog.network core projects.
> Currently, this is the official Wallet and Node Webinterface (Specifically for our `champ` node implementation).

| project                            | folder           | development url         | deployed website                                   |
| ---------------------------------- | ---------------- | ----------------------- | -------------------------------------------------- |
| [shared components](#)             | `./components`   | `localhost:2020`        | -                                                  |
| [wallet](./sites/wallet/README.md) | `./sites/wallet` | `wallet.localhost:2020` | [`wallet.pog.network`](https://wallet.pog.network) |
| [admin](./sites/admin/README.md)   | `./sites/admin`  | `admin.localhost:2020`  | -                                                  |

For more information about a specific project, click its name.

## Getting Started

### 1. Install Requirements

#### Development

- [`node` `16.x`](https://nodejs.org/en/)
- [`pnpm` `6.x`](https://pnpm.io/installation)

### 2. Clone Repo

```bash
$ git clone https://github.com/pognetwork/wallet.git && cd wallet
```

### 3. Install JS Dependencies

```bash
$ pnpm install
```

## Development

### Run dev server

```bash
$ pnpm dev
```
