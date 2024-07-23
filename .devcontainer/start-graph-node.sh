#!/bin/bash

# Executed in the context of the `graph-node` container.
# Expects /workspace to be mounted as a volume, and have
#   access to /workspace/.devcontainer

# TODO: listen on a port to get a message that would restart this container


if [ -f /workspace/.env ]; then
    source /workspace/.env
fi

start