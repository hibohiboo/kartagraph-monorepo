#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)

cd $parent_dir && docker run -v $(pwd):/work python:3.12 python /work/python/csv_as_enclosure_json.py --structure /work/data/complexity.csv --weights /work/data/revisions.csv > ./crime-scene-hotspots/hotspots.json
