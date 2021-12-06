#!/bin/sh
commit_message=$1
if [ -z $commit_message ]
then
    commit_message="no commit message specified"
fi
git add .
git commit -m "${commit_message}"
git pull
git push