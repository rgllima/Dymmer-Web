set -e

eval `ssh-agent -s`
ssh-add github-dymmer #Add Private Key Every Build - It's a bug im my PC

yarn build

cd dist

git init
git add -A
git commit -m 'deploy'
git branch -M master

git push -f git@github.com:dymmerufc/dymmerufc.github.io.git master

cd -
