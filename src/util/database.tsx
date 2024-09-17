import SQLite from 'react-native-sqlite-storage';


// Open a database connection
// const db = SQLite.openDatabase(
//   { name: 'places.db', location: 'default' },
//   () => console.log('Database opened successfully'),
//   error => console.error('Database error: ', error)
// );
var db= SQLite.openDatabase("places.db", "1.0", "Test Database", 200000);

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
    }
  );
  });

  return promise;
}

export async function insertPlace(place: any) {
  try {
    console.log('Place details:', place.location.lat);

    const result = await new Promise<any>((resolve, reject) => {
      db.transaction(tx => {
        // Insert the place
        tx.executeSql(
          `INSERT INTO places (title, image, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
          [place.title, place.imageUrl, place.address, place.location.lat, place.location.lng],
          (_, insertResult) => {
            console.log('Place inserted successfully:', insertResult);

            // Now select the inserted record using the insertId
            tx.executeSql(
              `SELECT * FROM places WHERE id = ?`,
              [insertResult.insertId],
              (_, selectResult) => {
                console.log('Inserted place details:', selectResult.rows.item(0));
                resolve(selectResult.rows.item(0)); // Return the inserted data
              },
              (_, selectError) => {
                console.log('Error selecting inserted place:', JSON.stringify(selectError));
                reject(selectError);
              }
            );
          },
          (_, error) => {
            console.log('Error inserting place:', JSON.stringify(error));
            reject(error);
          }
        );
      });
    });

    return result;
  } catch (error) {
    console.error('Error in insertPlace:', error);
    throw error; // Re-throw error to handle it at the caller level
  }
}


export async function fetchPlaces() {
  try {
    const result = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM places`,
          [],
          (_, result) => {
            console.log('Places fetched successfully:', result);

            // Resolve with the actual list of places (rows)
            const places = [];
            for (let i = 0; i < result.rows.length; i++) {
              places.push(result.rows.item(i));  // Extract each row and push it into the places array
            }

            resolve(places);  // Resolve with the array of places
          },
          (_, error) => {
            console.log('Error fetching places:', error);
            reject(error);  // Reject with error
          }
        );
      });
    });

    return result;  // Return the fetched places
  } catch (error) {
    console.error('Error in fetchPlaces:', error);
    throw error;  // Rethrow the error to handle it at the caller level
  }
}



export async function fetchPlaceDetails (id: number) {
  const promise=new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          console.log('Place details fetched successfully:', result.rows.item(0));
          resolve(result.rows.item(0));
        },
        (_, error) => {
          reject(error);
        }
      );
    })
  })

  return promise
}


