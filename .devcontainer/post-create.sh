#!/bin/bash

echo "" >> ~/.bashrc
echo "set -o allexport" >> ~/.bashrc
echo "if [ -f /workspace/.env ]; then source /workspace/.env; fi" >> ~/.bashrc
echo "set +o allexport" >> ~/.bashrc

echo "if [ -f /workspace/.substreams.env ]; then source /workspace/.substreams.env; fi" >> ~/.bashrc

