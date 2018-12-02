const Schema = require('mongoose').Schema

const registroSchema = new Schema ({
  title: String,
  notes: String,
  custom1: String,
  custom2: String,
  custom3: String,
  custom4: String,
  custom5: String,
  misc1: String,
  misc2: String,
  misc3: String
},
{
  timestamps: {
    createdAt: 'created_At',
    updatedAt: 'updated_At'
  },
  versionKey: false
})

module.exports = require('mongoose').model('Registro', registroSchema)
