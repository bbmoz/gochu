#!/bin/bash

set -ex

DIST_DIR=$(pwd)/../dist/server

mkdir -p ${DIST_DIR}
cp -r src/ ${DIST_DIR}
