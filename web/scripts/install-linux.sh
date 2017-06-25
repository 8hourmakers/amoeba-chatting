#!/usr/bin/env bash

# 최신 버전의 node.js를 설치합니다.
curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -

# npm 권한 문제를 해결합니다.
# npm global 패키지 설치 경로를 수정합니다.
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo "export PATH=~/.npm-global/bin:$PATH" >> ~/.profile
source ~/.profile

# npm을 최신 버전으로 업데이트합니다.
npm install -g npm

# 라이브러리를 설치합니다.
npm install
