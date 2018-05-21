#!/bin/sh

# echo cordova/hooks/README.md
# git checkout --patch feature/HXDN-10696-byggscript-web-cordova-rekit cordova/hooks/README.md

# echo cordova/package-lock.json
# git checkout --patch feature/HXDN-10696-byggscript-web-cordova-rekit cordova/package-lock.json

# echo cordova/package.json
# git checkout --patch feature/HXDN-10696-byggscript-web-cordova-rekit cordova/package.json

# echo cordova/README.md
# git checkout --patch feature/HXDN-10696-byggscript-web-cordova-rekit cordova/README.md

# echo cordova/www/cordova/index.css
# git checkout --patch feature/HXDN-10696-byggscript-web-cordova-rekit cordova/www/cordova/index.css

# echo  cordova/www/cordova/index.js
# git checkout --patch feature/HXDN-10696-byggscript-web-cordova-rekit cordova/www/cordova/index.js

# echo cordova/www/index-original.html
# git checkout --patch feature/HXDN-10696-byggscript-web-cordova-rekit cordova/www/index-original.html

# echo cordova/www/README.txt
# git checkout --patch feature/HXDN-10696-byggscript-web-cordova-rekit cordova/www/README.txt

file=$1

echo merging in $file
git checkout --patch feature/HXDN-10696-byggscript-web-cordova-rekit $file


