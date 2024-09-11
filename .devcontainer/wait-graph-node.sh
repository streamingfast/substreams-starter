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


echo "Waiting for /workspace/.substreams.env to have a configured endpoint"
until test -e /workspace/.substreams.env && grep -q 'SUBSTREAMS_API_TOKEN=' /workspace/.substreams.env; do
    sleep 1
done
echo "if [[ -f /workspace/.substreams.env ]]; then source /workspace/.substreams.env; fi" | tee -a ~/.profile >> ~/.bashrc

echo "Config ready, launching graph-node..."
reflex -g /workspace/.graph-node/config.toml -g /workspace/.substreams.env -s /workspace/.devcontainer/start-graph-node.sh
