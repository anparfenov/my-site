const fs = require('fs')
const { nanoid } = require('nanoid')
const DATAFILE = '_data/csshash.json'
const PCSSFILE = 'csshash'
const YEARFILE = '_data/year.json'

const hash = nanoid();

var jsonValue = `{
  "indexCSS": "index-${hash}.css"
}`
fs.writeFileSync(DATAFILE, jsonValue)

var yearValue = `{
  "copyrightYear": "${new Date().getFullYear()}"
}`
fs.writeFileSync(YEARFILE, yearValue)

var txtValue = `index-${hash}.css`
fs.writeFileSync(PCSSFILE, txtValue)
