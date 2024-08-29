import SQLite from 'react-native-sqlite-storage';


// Open a database connection
// const db = SQLite.openDatabase(
//   { name: 'places.db', location: 'default' },
//   () => console.log('Database opened successfully'),
//   error => console.error('Database error: ', error)
// );
var db = SQLite.openDatabase("places.db", "1.0", "Test Database", 200000);

export function init() {
  const promise = new Promise<void>((resolve: any, reject: any) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          image TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          console.log('places table created successfully');
          resolve("places table created successfully");
        },
        (error: any )=> {
          console.log('Error creating table: ', error);
          reject(error);
        }
      );
    });
  });

  return promise;
}
