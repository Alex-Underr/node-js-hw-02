const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  listContacts,
  addContact,
  getContactById,
  updateContact,
  removeContact,
  updateFavorite,
};