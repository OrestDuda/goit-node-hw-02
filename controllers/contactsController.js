const { Contact } = require('../db/contactsModel')

const listContacts = async () => {
  return Contact.find({})
}

const getById = async (contactId) => {
  return Contact.findById(contactId)
}

const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId)
  return true
}
const addContact = async (body) => {
  const { name, email, phone, favorite } = body
  await (favorite === true) ? Contact.create({ name, email, phone, favorite: true }) : Contact.create({ name, email, phone })
}

const updateContact = async (contactId, body) => {
  const { name, email, phone, favorite } = body
  await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone, favorite } })
}

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body
  await Contact.findByIdAndUpdate(contactId, { $set: { favorite } })
  return true
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
