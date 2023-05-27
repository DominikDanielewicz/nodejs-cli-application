const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");

const mainPath = __dirname;
const fileName = path.basename("db/contacts.json");
const directoryName = path.dirname("db/contacts.json");
const contactsPath = path.join(mainPath, directoryName, fileName);

async function getContacts() {
  try {
    const contacts = await fs
      .readFile(contactsPath)
      .then((data) => JSON.parse(data))
      .catch((error) => console.log(error.message));

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function listContacts() {
  try {
    console.table(await getContacts());
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    console.table([contact], ["id", "name", "email", "phone"]);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getContacts();
    const updatedContacts = contacts.filter(
      (contact) => contactId !== contact.id
    );

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: randomUUID(),
      name: name,
      email: email,
      phone: phone,
    };

    const contacts = await getContacts();
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
