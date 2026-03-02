#!/bin/bash
mkdir dir005
touch dir005/file3.txt
echo "hello>> dir005/file3.txt"
mkdir dir006
cp dir005/file3.txt dir006
echo "global>> dir004/file4.txt"
