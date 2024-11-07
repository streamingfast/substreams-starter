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

if [[ ! -f /workspace/.graph-node/config.toml ]]; then
    echo "Waiting for a 'subgraph.yaml' (or '/workspace/.graph-node/config.toml') file to be present in the workspace"
    until SUBGRAPH_PATH="$(find . -type f -name subgraph.yaml|head -n 1)" &&  grep '^ *network:' $SUBGRAPH_PATH || [[ -f /workspace/.graph-node/config.toml ]] ; do
        sleep 1
    done

    if [[ ! -f /workspace/.graph-node/config.toml ]]; then
        NETWORK=$(awk  '/^ *network:/ {print $2}' $SUBGRAPH_PATH)
        mkdir -p /workspace/.graph-node
        cp /workspace/.devcontainer/graphnodeconfig/config.toml /tmp/config.toml
    
        ENDPOINT=$(/workspace/.devcontainer/bin/substreams tools default-endpoint $NETWORK)
        if [[ -z "$ENDPOINT" ]]; then
            PROVIDERS=$(curl -L https://graphregistry.pages.dev/TheGraphNetworksRegistry.json | jq '.networks.[]|select((.id == "'$NETWORK'") or (.aliases |index("'$NETWORK'")))|.support.substreams')
            if [[ -z "$PROVIDERS" ]]; then
                echo "No substreams support for network $NETWORK"
                ENDPOINT=SET_ENDPOINT_FOR_NETWORK_${NETWORK}
            else
                ENDPOINT=$(echo $PROVIDERS | jq -r '(.[]|select(.provider == "streamingfast")).url')
                if [[ -z "$ENDPOINT" ]]; then
                    ENDPOINT=$(echo $PROVIDERS | jq -r '(.[0]).url')
                fi
            fi
        fi
        sed -i 's@%%SUBGRAPH_PATH%%@'"$SUBGRAPH_PATH"'@g' /tmp/config.toml
        sed -i 's/%%ENDPOINT%%/'"$ENDPOINT"'/g' /tmp/config.toml
        sed -i 's/%%NETWORK%%/'"$NETWORK"'/g' /tmp/config.toml
        cat /tmp/config.toml > /workspace/.graph-node/config.toml
        chown 1000:1000 /workspace/.graph-node/config.toml
    fi
fi

echo "Config ready, launching graph-node..."

cd /workspace/.graph-node
reflex -g config.toml -s /workspace/.devcontainer/start-graph-node.sh
