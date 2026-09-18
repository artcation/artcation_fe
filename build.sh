#!/bin/sh
cd ../
mkdir output
cp -R ./artcation_fe/* ./output
rm -rf ./output/.github
cp -R ./output ./artcation_fe/