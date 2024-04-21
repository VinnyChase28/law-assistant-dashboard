#!/bin/bash

# Find all .ts and .tsx files in the src directory and its subdirectories
find ./src -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 | while IFS= read -r -d $'\0' file; do
    # Print the file name
    echo "File: $file"
    # Extract lines that start with 'import'
    grep '^import' "$file"
    echo # Print a newline for readability
done