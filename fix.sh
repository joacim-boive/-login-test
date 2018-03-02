#!/bin/sh

actions=`egrep '^// ' ajax-actions.txt | sed -e 's|// ||g'` 

cp ajax-actions.txt ajax-actions2.txt

for action in $actions ; do
    underscore=`echo $action| sed 's/\([a-z0-9]\)\([A-Z]\)/\1_\L\2/g' | tr 'abcdefghijklmnopqrstuvwxyz' 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`

    sed -i.bak -e "s|// $action$|// $action $underscore|g" ajax-actions2.txt
done
