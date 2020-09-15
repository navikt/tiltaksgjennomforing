#!/bin/sh
for i in $(git diff --cached --name-only|grep .svg)
do
  echo "Minifiserer og Gir unik ID til SVG: $i"
  svgo --enable=prefixIds $i
done