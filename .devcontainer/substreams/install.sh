#!/bin/bash

LINK=$(curl -s https://api.github.com/repos/streamingfast/substreams/releases/latest | awk "/download.url.*linux_$(uname -m | sed s/aarch64/arm64/)/ {print \$2}" | sed 's/"//g')
echo Downloading $LINK
curl -L  $LINK  | tar zxf -
mv substreams /usr/bin/substreams

LINK=$(curl -s https://api.github.com/repos/bufbuild/buf/releases/latest | awk "/download.url.*buf-Linux-$(uname -m)\"/ {print \$2}" | sed 's/"//g')
echo Downloading $LINK
curl -L $LINK -o /usr/bin/buf
