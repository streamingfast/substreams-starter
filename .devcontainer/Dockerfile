FROM mcr.microsoft.com/devcontainers/rust:1.0.14-bullseye

RUN rustup target add wasm32-unknown-unknown ; rustup update

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs

RUN cargo install protoc-gen-prost protoc-gen-prost-crate

RUN apt-get -y install --no-install-recommends ca-certificates gnupg2 tar gcc make pkg-config netcat-openbsd

RUN LINK=$(curl -s https://api.github.com/repos/bufbuild/buf/releases/latest | awk "/download.url.*buf-Linux-$(uname -m)\"/ {print \$2}" | sed 's/"//g') && curl -L $LINK -o /usr/bin/buf && chmod +x /usr/bin/buf
RUN ARCH=$(dpkg --print-architecture); curl -LO https://go.dev/dl/go1.22.5.linux-$ARCH.tar.gz && tar -C /usr/local -xzf go1.22.5.linux-$ARCH.tar.gz && rm go1.22.5.linux-$ARCH.tar.gz
RUN ARCH=$(dpkg --print-architecture); curl -LO https://github.com/tinygo-org/tinygo/releases/download/v0.32.0/tinygo_0.32.0_$ARCH.deb && dpkg -i tinygo_0.32.0_$ARCH.deb && rm tinygo_0.32.0_$ARCH.deb

RUN curl -LO https://raw.githubusercontent.com/devcontainers/features/main/src/docker-outside-of-docker/install.sh && chmod +x /install.sh && ./install.sh && rm install.sh # this is done again in the 'devcontainer feature' but precached all pkgs

RUN chown -R vscode /usr/local/cargo

RUN rm -rf /var/lib/apt/lists/*

ENV PATH="$PATH:/usr/local/go/bin:/go/bin"
ENV GOROOT="/usr/local/go"
ENV GOPATH="/go"

RUN cargo install toml-cli

RUN VER=$(curl --silent -qI https://github.com/streamingfast/substreams/releases/latest | awk -F '/' '/^location/ {print  substr($NF, 1, length($NF)-1)}') && curl -LO https://github.com/streamingfast/substreams/releases/download/$VER/substreams_linux_x86_64.tar.gz && tar xzf substreams_linux_x86_64.tar.gz substreams && mv substreams /usr/bin/substreams

RUN npm install -g @graphprotocol/graph-cli

# the 'help' command will be added in post-create steps
COPY <<EOF /etc/motd
Welcome to the Substreams Development Environment!

Type 'help' to see a list of available commands.
Type 'substreams init' to start building your substreams!
---------------------------------------------------------
EOF

# docker buildx build --platform linux/amd64  . -t ghcr.io/streamingfast/substreams-starter:latest
# docker push ghcr.io/streamingfast/substreams-starter:latest
