FROM mcr.microsoft.com/devcontainers/rust:1.0.14-bullseye

RUN rustup target add wasm32-unknown-unknown ; rustup update

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs

RUN cargo install protoc-gen-prost protoc-gen-prost-crate
