#!/usr/bin/env bash
for pkg in core jquery jquery-file-upload; do
    npx jsdoc --configure jsdoc-conf.json --template template --destination "doc/${pkg}" --readme ./README.md "dist/cloudinary-${pkg}.js"
     [[ $? -ne 0 ]] && rm -r "pkg/pkg-cloudinary-${pkg}/docs"
     [[ $? -ne 0 ]] && cp -r "doc/${pkg}" "pkg/pkg-cloudinary-${pkg}/docs"
done