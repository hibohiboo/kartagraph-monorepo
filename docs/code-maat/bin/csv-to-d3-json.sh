#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
py_dir=$(cd $bin_dir/../python && pwd)

cd $py_dir && python csv_as_enclosure_json.py --structure ../data/complexity.csv --weights ../data/revisions.csv > ../public/hotspots.json
