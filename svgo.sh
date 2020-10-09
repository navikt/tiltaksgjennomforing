#!/bin/sh
for i in $(git diff  --cached --diff-filter=AMR --name-only|grep .svg)
do
  echo "Minifiserer og gir unik id til svg: $i"
  svgo --enable=prefixIds --disable=removeViewBox $i
done