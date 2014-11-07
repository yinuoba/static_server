@echo off
supervisor -w common,conf,controllers,database,models,routers,app.js,views/pagetitle.js -e .js -x node app
pause