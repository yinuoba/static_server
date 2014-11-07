/**
 * 共用模块
 * @type {[type]}
 */
global.express = require('express')
global.http = require('http')
global.fs = require('fs')
global.path = require('path')
global.url = require('url')
global.ejs = require('ejs')
global._ = require('underscore')
global.logger = require(COMMON + 'log').logger

// 扩展Date对象
require(COMMON + 'date')