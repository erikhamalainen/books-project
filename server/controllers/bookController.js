import Book from '../models/bookModel.js'
import createError from 'http-errors'
import logger from '../util/logger.js'
import mongoose from 'mongoose'

/**
 * Function to call the database to fetch all the books in it,
 * is called everytime page is loaded.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns All books
 */
async function getAllBooks(req, res, next) {
  try {
    const allBooks = await Book.find()
    res.status(200).json({ books: allBooks })
  } catch (error) {
    logger.error(`bookController getAllBooks failed: ${error.message}`)
    logger.error(error.stack)
    next(createError(500, 'Could not fetch books'))
  }
}

/**
 * Function to add the bookdata filled in the form, is called on submit.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns The data of the book added
 */
async function addBook(req, res, next) {
  const newBook = req.body
  const bookData = new Book(newBook)
  try {
    await bookData.save()
    res.status(200).json({ bookData: bookData, message: "Added book succesfully!"})
  } catch (error) {
    logger.error(`bookController addBook failed: ${error.message}`)
    logger.error(error.stack)
    next(createError(500, 'Add failed'))
  }
}

/**
 * Function to update an existing book data with new data filled in the form, is called on submit,
 * if a existing book is selected. Id is used for checking that the entry exists, if not will return error.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns The data of the updated book
 */
async function updateBook(req, res, next) {
  const { id: _id } = req.params
  const bookData = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next(createError(404, `Selected book not found, update failed`))
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(_id, bookData, { new: true })
    res.status(200).json({ updatedBook: updatedBook, message: "Updated book succesfully!"})
  } catch (error) {
    logger.error(`bookController updateBook failed: ${error.message}`)
    logger.error(error.stack)
    next(createError(500, 'Update failed'))
  }
}

/**
 * Function to delete a book, is called when everytime user selects a row and clicks delete.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns id of the deleted book
 */
async function deleteBook(req, res, next) {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next(createError(404, `Selected book not found, delete failed`))
  }
  try {
    await Book.findByIdAndRemove(_id)
    res.status(200).json({ id: _id, message: "Removed book succesfully!" })
  } catch (error) {
    logger.error(`bookController deleteBook failed: ${error.message}`)
    logger.error(error.stack)
    next(createError(500, 'Delete failed'))
  }
}

export default {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
}
