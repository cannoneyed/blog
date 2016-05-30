#!/bin/bash

npm run clean
gatsby build

# Copy static files
find static/ -type f -regex ".*\.\(png\|eot\|svg\|ttf\|woff\)" -exec cp {} public/ \;