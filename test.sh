#!/usr/bin/env bash

# Pull 240 null bytes from /dev/zero and replace them each with 'a'
nightmare=$(head -c 240 < /dev/zero | tr '\0' '\141')
node ~/bogosortbot-twitter/. $nightmare

declare -a tests=("this is a sentence" "apple" "1 2 3 4 5")

for i in "${tests[@]}"
do 
    node ~/bogosortbot-twitter/bogosort.js $i 
done
