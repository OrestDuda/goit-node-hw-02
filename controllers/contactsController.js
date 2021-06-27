const fs = require('fs').promises
const { nanoid } = require('nanoid')
const path = require('path')

const contactsPath = path.resolve('./model/contacts.json')

const listContacts = async () => {
  try {
    const allContacts = await fs.readFile(contactsPath)
    return JSON.parse(allContacts)
  } catch (err) { return err.message }
}

const getById = async (contactId) => {
  try {
    const allContacts = await fs.readFile(contactsPath)
    return JSON.parse(allContacts).find(({ id }) => id === Number(contactId))
  } catch (err) { return err.message }
}

const removeContact = async (contactId) => {
  try {
    const list = await fs.readFile(contactsPath)
    const filteredList = JSON.parse(list).filter((list) => list.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(filteredList))
    return true
  } catch (err) {
    return err.message
  }
}
const addContact = async (body) => {
  const newContact = {
    id: nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  }
  const allContacts = await fs.readFile(contactsPath)
  const list = JSON.parse(allContacts)
  list.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(list), 'utf8')
}

const updateContact = async (contactId, body) => {
  let updatedContact
  try {
    const allContacts = await fs.readFile(contactsPath, 'utf8')
    const updatedList = JSON.parse(allContacts).map(contact => {
      if (contact.id === (contactId)) {
        updatedContact = { ...contact, ...body }
        return updatedContact
      } return contact
    })
    await fs.writeFile(contactsPath, JSON.stringify(updatedList), 'utf8')
    return updatedContact
  } catch (err) { return err.message }
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact
}
