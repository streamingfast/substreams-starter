#!/bin/bash

echo "" >> ~/.bashrc
echo "set -o allexport" >> ~/.bashrc
echo "source /workspace/.env" >> ~/.bashrc
echo "set +o allexport" >> ~/.bashrc

