#!/bin/bash

cat <<EOC >> ~/.bashrc

alias help=/workspace/.devcontainer/bin/help
set -o allexport
if [ -f /workspace/.env ]; then source /workspace/.env; fi
set +o allexport
if [ -f /workspace/.substreams.env ]; then source /workspace/.substreams.env; fi
if [ -f /etc/motd ]; then cat /etc/motd; fi
EOC
# added separately to make sure the $PATH env var is not interpolated
echo 'PATH="./node_modules/.bin:$PATH:/workspace/.devcontainer/bin"' >> ~/.bashrc

. ~/.bashrc

git config --global --add safe.directory /workspace
/workspace/.devcontainer/bin/dev-restart-postgres # fix an issue (race?) on github codespaces where vscode changes the ownership of those files..
/workspace/.devcontainer/bin/dev-update