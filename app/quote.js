const sqlite3 = require('sqlite3').verbose();

var Quote = module.exports = {
    get_quote: function(callback) {
        let db = new sqlite3.Database('../quotes.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the quotes database.');
            var sql = 'select quote from quotes where chosen = 1 limit 1';

            db.get(sql, [], (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Getting: ' + row.quote);
                callback(row.quote);
            });
        });
    },
    set_new_quote: function(callback) {
        let db = new sqlite3.Database('../quotes.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }

            console.log('Connected to the quotes database.');
            var sql = 'update quotes set chosen = 0 where chosen = 1';

            db.run(sql, [], (err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Clearing old quote');
                sql = 'Select id from quotes where chosen = 0 order by random() limit 1';
                db.get(sql, [], (err, row) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log('Getting new quote id');
                    var id = row.id;
                    sql = 'update quotes set chosen = 1 where id = ?';
                    db.run(sql, [id], (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                        console.log('Setting new quote');
                        db.close();
                        callback();
                    });
                });
            });
        });
    }
}

// var Quote = module.exports = {
//     get_quote: function(callback) {
//         var file = __dirname + '/tmp/quote.json';
//         if (fs.existsSync(file)) {
//             var obj = jsonfile.readFileSync(file);
//             console.log('READ OBJECT: ' + obj.quote);
//             if (obj.quote) {
//                 callback(obj.quote);
//             } else {
//                 callback('NO QUOTE');
//             }
//         } else {
//             callback('NO QUOTE');
//         }
//     },
//     save_new_quote: function(callback) {
//         let db = new sqlite3.Database('../quotes.db', sqlite3.OPEN_READWRITE, (err) => {
//             if (err) {
//                 return console.error(err.message);
//             }

//             console.log('Connected to the quotes database.');
//             var sql = 'Select quote, id from quotes where chosen = 0 order by random() limit 1';

//             db.get(sql, [], (err, row) => {
//                 if (err) {
//                     console.error(err.message);
//                 }
//                 var file = __dirname + '/tmp/quote.json';
//                 var obj = {quote: row.quote};
//                 if (!fs.existsSync(file)) {
//                     fs.writeFileSync(file, '', function(err) {
//                         if (err) {
//                             console.error(err.message)
//                         }
//                         console.log('File created!');
//                     });
//                 }
//                 jsonfile.writeFileSync(file, obj);
//                 console.log('Saving: ' + row.quote);
//                 console.log(row.id);
//                 callback();
//             });
//         });
//     }
// }