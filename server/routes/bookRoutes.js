import express from 'express'
import bookController from '../controllers/bookController.js'
import { use } from '../middlewares/errorHandler.js'

const router = express.Router()

router.get('/', use(bookController.getAllBooks))
router.post('/createBook', use(bookController.addBook))
router.put('/:id', use(bookController.updateBook))
router.delete('/:id', use(bookController.deleteBook))

export default router
