#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)

cd $parent_dir && docker run -it --rm -p 8080:8080 -v $(pwd)/crime-scene-hotspots:/crime-scene-hotspots python:3-alpine python -m http.server 8080
