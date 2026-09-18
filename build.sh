#!/bin/sh
cd ../
mkdir -p output
cp -R ./artcation_fe/. ./output/
rm -rf ./output/.git ./output/node_modules ./output/.github