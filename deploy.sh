#!/bin/sh
git pull origin main
cd front
npm install
npm run build
echo "Removing old HTML build..."
rm -rf -v /var/www/beaworldleader.com/html/**/*
echo "Successfully removed"
echo "Copying new HTML build to www folder..."
cp -r -v ./build/. /var/www/beaworldleader.com/html/
echo "Successfully copied"
cd ../back
npm install
cd ..
pm2 restart all
