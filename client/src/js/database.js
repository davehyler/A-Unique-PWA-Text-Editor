import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => 
{
  //declare database AND the currently associated version.
  const jateDB = await openDB('jate', 1);
  //opens a new transaction specifying which database (only one used with the name "jate") and the user's read/write privs.
  const tx = jateDB.transaction('jate', 'readwrite');
  //pulls the desired stored object from specified database.
  const store = tx.objectStore('jate');
  //request passes the content to the ID with associated value.
  const request = store.put({ id: 1, value: content });
  //awaiting the request for confirmation and console log printed.
  const result = await request;
  console.log('Your content has been added to our database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => 
{
  //declare database AND the currently associated version.  
  const jateDB = await openDB('jate', 1);
  //opens a new transaction specifying which database, using "readonly" priveleges since we are only getting the content and not storing.
  const tx = jateDB.transaction('jate', 'readonly');
  //pulls the desired stored object from specified database.
  const store = tx.objectStore('jate');
  //request passes the content to get all (rather than a specific ID)
  const request = store.getAll();
  //awaiting the request for confirmation and console log printed.
  const result = await request;
  console.log('Your database results: ', result);
  //return the results to a stored value
  return result?.value;
}

initdb();
