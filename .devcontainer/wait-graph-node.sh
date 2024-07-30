#!/bin/bash

# Import `reflex` in container
if ! command -v reflex &> /dev/null; then
    apt update
    apt install -y wget
    pushd /tmp
        wget https://github.com/cespare/reflex/releases/download/v0.3.1/reflex_linux_amd64.tar.gz
        tar zxvf reflex*tar.gz
        mv reflex*/reflex /usr/bin
        rm reflex*.tar.gz
    popd
fi


echo "Waiting for /workspace/.graph-node/config.toml to have a configured endpoint"
until grep -q '^\[chains\..*\]$' /workspace/.graph-node/config.toml; do
    sleep 1
done

echo "Config ready, launching graph-node..."
reflex -g /workspace/.graph-node/config.toml -g /workspace/.env -s /workspace/.devcontainer/start-graph-node.sh
