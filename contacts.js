import * as fs from 'fs/promises' ;
import { nanoid } from 'nanoid';

export const listContacts = async () => {
  const contactsJson = await fs.readFile("./db/contacts.json", "utf8");
  return JSON.parse(contactsJson);
};
  
export async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId);
}

export async function removeContact(contactId) {
 const contact = await listContacts();
 const index = contact.findIndex(contact => contact.id === contactId);
 contact.splice(index, 1);
 await fs.writeFile('./db/contacts.json', JSON.stringify(contact));
 return true;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contact = {id:nanoid(),name, email, phone};
  contacts.push(contact);
  await fs.writeFile('./db/contacts.json', JSON.stringify(contacts));
  return contact;
}