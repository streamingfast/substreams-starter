FROM mcr.microsoft.com/devcontainers/rust:1.0.14-bullseye

RUN rustup target add wasm32-unknown-unknown ; rustup update

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs

RUN cargo install protoc-gen-prost protoc-gen-prost-crate

RUN apt-get -y install --no-install-recommends ca-certificates gnupg2 tar gcc make pkg-config

RUN LINK=$(curl -s https://api.github.com/repos/bufbuild/buf/releases/latest | awk "/download.url.*buf-Linux-$(uname -m)\"/ {print \$2}" | sed 's/"//g') && curl -L $LINK -o /usr/bin/buf && chmod +x /usr/bin/buf
RUN ARCH=$(dpkg --print-architecture); curl -LO https://go.dev/dl/go1.22.5.linux-$ARCH.tar.gz && tar -C /usr/local -xzf go1.22.5.linux-$ARCH.tar.gz && rm go1.22.5.linux-$ARCH.tar.gz
RUN ARCH=$(dpkg --print-architecture); curl -LO https://github.com/tinygo-org/tinygo/releases/download/v0.32.0/tinygo_0.32.0_$ARCH.deb && dpkg -i tinygo_0.32.0_$ARCH.deb && rm tinygo_0.32.0_$ARCH.deb

RUN curl -LO https://raw.githubusercontent.com/devcontainers/features/main/src/docker-outside-of-docker/install.sh && chmod +x /install.sh && ./install.sh && rm install.sh

RUN rm -rf /var/lib/apt/lists/*

ENV PATH="$PATH:/usr/local/go/bin"
ENV GOROOT="/usr/local/go"
