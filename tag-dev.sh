#!/bin/bash
git add .
git commit -m "tag deploy v1.0.1.dev"
git pull --rebase
git push
git tag v1.0.1.dev
git push origin v1.0.1.dev