#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
maat_dir=$(cd $bin_dir/../../../../tmp/code-maat && pwd)

cd $maat_dir

docker build -t code-maat-app .
