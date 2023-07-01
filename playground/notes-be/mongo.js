const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const Note = require('./models/note')

// if (process.argv.length < 3) {
//   logger.error('give password as argument')
//   process.exit(1)
// }

const url = config.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const note = new Note({
  content: 'HTML is easy...',
  important: false,
})

note.save().then(result => {
  logger.info('note saved!', result)
  mongoose.connection.close()
})

// Note.find({ important: true }).then(result => {
//   result.forEach(note => logger.info(note))
//   mongoose.connection.close()
// })