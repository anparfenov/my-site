const fs = require('fs')
const path = require('path');
const CleanCss = require('clean-css');

const DATAFILE =  path.resolve(__dirname, '../../_data/csshash.json');
const CSSFILE = path.resolve(__dirname, '../../_site/assets/css/index.css');

const cssHash = JSON.parse(fs.readFileSync(DATAFILE, 'utf-8'));
const MINIFIED_CSSFILE = path.resolve(__dirname, `../../_site/assets/css/${cssHash.indexCSS}`);

const cssFile = fs.readFileSync(CSSFILE, 'utf-8');

const minified = new CleanCss({}).minify(cssFile).styles;

fs.unlinkSync(CSSFILE);
fs.writeFileSync(MINIFIED_CSSFILE, minified);
