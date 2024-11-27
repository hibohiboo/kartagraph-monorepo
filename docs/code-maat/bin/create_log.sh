#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)

# https://github.com/adamtornhill/code-maat
# ※ afterの合理的なデフォルトの日付は1年前 ... Code as a crime sience - P24
git log --all --numstat --date=short --pretty=format:'--%h--%ad--%aN' --no-renames --after=2023-01-01 > $bin_dir/../data/logfile.log

