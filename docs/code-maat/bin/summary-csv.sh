#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
data_dir=$(cd $bin_dir/../data && pwd)
root_dir=$(cd $bin_dir/../../.. && pwd)

# code-maat-1.0.4-standalone.jar が 存在しなければダウンロードする
if [ ! -e $data_dir/code-maat-1.0.4-standalone.jar ]; then
  wget https://github.com/adamtornhill/code-maat/releases/download/v1.0.4/code-maat-1.0.4-standalone.jar -P $data_dir
fi

docker run -v $data_dir:/data -it eclipse-temurin:21 java -jar /data/code-maat-1.0.4-standalone.jar -l /data/logfile.log -c git2 -a revisions > $data_dir/revisions.csv
docker run --rm -v $root_dir:/tmp aldanial/cloc --unix --by-file --csv --quiet --timeout 10 --vcs=git --exclude-dir=docs,.vscode,.github --not-match-f=\.json --report-file=./docs/code-maat/data/complexity.csv
