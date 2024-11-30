#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
data_dir=$(cd $bin_dir/../data && pwd)
root_dir=$(cd $bin_dir/../../.. && pwd)

docker run -v $data_dir:/data -it code-maat-app -l /data/logfile.log -c git2 > $data_dir/logfile.csv
docker run -v $data_dir:/data -it code-maat-app -l /data/logfile.log -c git2 -a revisions > $data_dir/revisions.csv
docker run --rm -v $root_dir:/tmp aldanial/cloc --unix --by-file --csv --quiet --timeout 10 --vcs=git --exclude-dir=docs,.vscode,.github --not-match-f=\.json --report-file=./docs/code-maat/data/complexity.csv
