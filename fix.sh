#!/bin/sh

name=$1

if [ ! "$name" ] ; then
    echo "usage: fix <name>"
    exit 1
fi

files=$(find src tests -name "*.js" -exec fgrep -l $name {} \;)

for file in $files ; do
    echo "[i] replacing $name with $new in $file"
    new=$(echo $name | sed -e 's|CUSTOMER_||g')
    sed -i.bak -e "s|$name|$new|g" $file
done


