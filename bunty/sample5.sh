#!/bin/bash
count_files(){
local dir=$1
local count=0
for item in "$dir"/*
do
if [-f "$item"]; then
	count = $((count+1))
elif [-d "item"]; then 
	sub_count = $((count_file "$item"))
	count = $((count_sub_count))
fi
done
echo $count
}
echo "Enter the Current Path"
read directory
if [-d "$directory"];
then
	total= $(count file "$directory")
	echo "total files in $directory & sub_directory is $total"
else
	echo "invalid directory"
fi
