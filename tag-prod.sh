#!/bin/bash
git add .
git commit -m "tag image v1.0.1.prod"
git pull --rebase
git push
git tag v1.0.1.prod
git push origin v1.0.1.prod
