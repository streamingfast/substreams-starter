# Substreams Starter Dev Kit

## Getting Started

<table><tr><td valign="top" align="right">Try <b>now</b>, click <b>Open</b>:
  
Your first 60h/month are free!
</td><td>

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new/streamingfast/substreams-starter?machine=standardLinux32gb)
</td></tr></table>

> This will open a containerized, fully featured development environment, using [GitHub Codespaces](https://github.com/features/codespaces).

Alternatively, you can **clone** this repository, and open it with Visual Studio Code. See instructions below.

Within the IDE, in a Terminal, run:

```bash
substreams init
substreams build
substreams auth
substreams gui
```

and generate sink projects with:

```bash
substreams codegen subgraph
substreams codegen sql
```

## Clone in local VSCode

Devcontainers have **matured greatly** in the last 3 years. They have been [standardized](https://containers.dev/) and implemented in [multiple IDEs and tools](https://containers.dev/supporting), and are used at scale in great companies (eg. [Shopify](https://shopify.engineering/shopifys-cloud-development-journey)).

VSCode has excellent support for such containers. See [their documentation](https://code.visualstudio.com/docs/devcontainers/containers).

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Install [VSCode](https://code.visualstudio.com/download)
- Install the [Devcontainer Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) in VSCode
- Open this repository, and execute "Rebuild & open in container"

## Included in the dev environment

- `substreams` preinstalled
- For _Substreams_ development: **Rust** toolchain, `buf` and protobuf tooling, 
- For _subgraph_ development: **node/npm**, along with all subgraph services, running in the devcontainer (`graph-node`, `postgres`, `ipfs`) directly accessible locally or remotely.
- Pre-configured VSCode extensions for everything, plus a custom _VSCode Substreams Extension_.

## Local install

The Dev Container is the preferred way to develop Substreams and sinks. Our documentation generally assumes this environment.

If you prefer, you can install all components locally by following our [installation docs](https://substreams.streamingfast.io/documentation/consume/installing-the-cli).

