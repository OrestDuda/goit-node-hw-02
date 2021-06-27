const express = require('express')
const router = express.Router()

const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact
} = require('../../controllers/contactsController')

const {addContactValidation, updateContactValidation} = require('../../middlewares/validationMiddleware')

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await listContacts()
    res.status(200).json({ status: 'ok', code: 200, message: 'Success Request', data: allContacts })
  } catch (err) { return err }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactByID = await getById(req.params.contactId)
    if (contactByID) {
      res.status(200).json({ status: 'ok', code: 200, message: 'Success Request', data: contactByID })
    } else {
      res.status(404).json({ status: 'ok', code: 404, message: 'Not found' })
    }
  } catch (err) { return err }
})

router.post('/', addContactValidation, async (req, res, next) => {
  const {
    name,
    email,
    phone
  } = req.body
  try {
    await addContact(req.body)
    res.status(201).json({
      status: 'ok',
      code: 201,
      message: 'Added Successful',
      data: req.body
    })
  } catch (err) {
    return err
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const removeByID = await removeContact(req.params.contactId)
    if (removeByID) {
      res.status(200).json({ status: 'ok', code: 200, message: 'contact deleted' })
    } else {
      res.status(404).json({ status: 'not found', code: 404, message: 'Not found' })
    }
  } catch (err) { return err }
})

router.patch('/:contactId', updateContactValidation, async (req, res, next) => {
  const { name, email, phone } = req.body
  try {
    const foundContact = getById(req.params.contactId)
    if (foundContact) {
      const updatedContact = await updateContact(req.params.contactId, req.body)
      res.status(200).json({ status: 'ok', code: 200, data: updatedContact })
    }res.status(400).json({ status: 'not ok', code: 400, message: 'not found' })
  } catch (err) { return err }
})

module.exports = router
