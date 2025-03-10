# Substreams Starter Dev Kit

## Getting Started

<table><tr><td valign="top" align="right">Try <b>now</b>, click <b>Open</b>:

Your first 60h/month are free!
</td><td>

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new/streamingfast/substreams-starter?machine=standardLinux32gb)
</td></tr></table>

> This will open a fully featured **Devcontainer-based** development environment, using [GitHub Codespaces](https://github.com/features/codespaces).

Within the IDE, in a Terminal (`F1` -> `Terminal: Create New Terminal`), run:

```bash
substreams init
substreams build
substreams auth
substreams gui
substreams registry login
substreams registry publish
```

Run `help` to better navigate the development environment and generate sink projects with:

```bash
substreams codegen subgraph
substreams codegen sql
```

Learn more:
- [Tutorials](https://substreams.streamingfast.io/tutorials/)
- [Substreams Documentation](https://substreams.streamingfast.io)

Discover community Substreams modules: 

- [Substreams Registry](https://substreams.dev/)

## Clone in local VSCode

VSCode has excellent support for such containers. See [their documentation](https://code.visualstudio.com/docs/devcontainers/containers).

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Install [VSCode](https://code.visualstudio.com/download)
- Install the [Devcontainer Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) in VSCode
- Open this repository, and execute "Rebuild & open in container"

> [!NOTE]
> Devcontainers, the environment proposed here, have **greatly matured** in the past 3 years. They have been [standardized](https://containers.dev/), implemented in [multiple IDEs and tools](https://containers.dev/supporting), and are used at scale in great companies (eg. [Shopify](https://shopify.engineering/shopifys-cloud-development-journey)).


## Local install

The **Devcontainer is the preferred way** to develop Substreams. Our documentation generally assumes this environment.

If you prefer, you can install all components locally by following our [installation docs](https://docs.substreams.dev/reference-material/substreams-cli/installing-the-cli).


## Included in the dev environment

- `substreams` preinstalled
- For _Substreams_ development: **Rust** toolchain, `buf` and protobuf tooling, 
- For _subgraph_ development: **node/npm**, along with all subgraph services, running in the devcontainer (`graph-node`, `postgres`, `ipfs`) directly accessible locally or remotely.
- Pre-configured VSCode extensions for everything, plus a custom _VSCode Substreams Extension_.


