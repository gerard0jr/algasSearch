const express   = require('express')
const router    = express.Router()
const parser    = require('xml-js')
const fs        = require('fs')
const Registro = require('../models/Registro')

router.get('/search', (req,res,next) => {
  res.render('index')
})

router.post('/search', (req,res,next) => {
  let {search} = req.params
  Registro.find({title: {$elemMatch: {}}}).limit(10)
  .then(results => {
    console.log(results)
    res.render('results/result', {results})
  })
})

router.get('/upload', (req, res, next) => {

  let xml = fs.readFileSync('demo.xml', 'utf8')
  let result = parser.xml2js(xml, {compact: true, nativeType: false, instructionHasAttributes: true, ignoreDeclaration: true})
  
  let registerFiltered 
  let dataArray = []
  let custom1,custom2,custom3,custom4,custom5,misc1,misc2,misc3

  result.xml.records.record.map( item => {
    if(typeof item.custom1 === 'undefined') custom1 = ''
    else custom1 = item.custom1.style._text
    if(typeof item.custom2 === 'undefined') custom2 = ''
    else custom2 = item.custom2.style._text
    if(typeof item.custom3 === 'undefined') custom3 = ''
    else custom3 = item.custom3.style._text
    if(typeof item.custom4 === 'undefined') custom4 = ''
    else custom4 = item.custom4.style._text
    if(typeof item.custom5 === 'undefined') custom5 = ''
    else custom5 = item.custom5.style._text
    if(typeof item.misc1 === 'undefined') misc1 = ''
    else misc1 = item.misc1.style._text
    if(typeof item.misc2 === 'undefined') misc2 = ''
    else misc2 = item.misc2.style._text
    if(typeof item.misc3 === 'undefined') misc3 = ''
    else misc3 = item.misc3.style._text

    registerFiltered = {
       title: item.titles.title.style._text,
       notes: item.notes.style._text,
       custom1: custom1,
       custom2: custom2,
       custom3: custom3,
       custom4: custom4,
       custom5: custom5,
       misc1: misc1,
       misc2: misc2,
       misc3: misc3,
     }
     dataArray.push(registerFiltered)
   })

  Registro.create(dataArray)
  .then( response => {
    res.send(`Se creó la base de datos con ${response.length} registros`)
  })
  .catch(err => next(err))
  
})



module.exports = router
