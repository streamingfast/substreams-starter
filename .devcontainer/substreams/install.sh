#!/bin/bash

LINK=$(curl -s https://api.github.com/repos/streamingfast/substreams/releases/latest | awk "/download.url.*linux_$(uname -m | sed s/aarch64/arm64/)/ {print \$2}" | sed 's/"//g')
echo Downloading $LINK
curl -L  $LINK  | tar zxf -
mv substreams /usr/bin/substreams

#pushd /tmp
#  git clone https://github.com/streamingfast/substreams
#  cd substreams
#  git checkout -b codegen-cmd origin/codegen-cmd
#  go install -v ./cmd/substreams
#popd
