#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)

cd $parent_dir && docker run -v $(pwd):/work python:3.12 python /work/python/merge_comp_freqs.py /work/data/revisions.csv /work/data/complexity.csv
