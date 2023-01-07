import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  description: String,
})

const Book = mongoose.model('Book', bookSchema)

export default Book
