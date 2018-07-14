import sqlite3
import requests

conn = sqlite3.connect('../quotes.db')

r = requests.get('http://classics.mit.edu/Antoninus/meditations.mb.txt')
if (r.status_code == 200) :

    text = r.text.split('\n')
    book_start = False
    quotes = []
    chunk = ''
    for line in text:
        if ('END' in line):
            book_start = False
        if (book_start) :
            add = True
            if ('BOOK' in line) :
                add = False
            if ('This in Carnuntum.' in line) :
                add = False
            if ('----------------------------------------------------------------------' in line) :
                add = False
            if (line == '' and chunk != ''):
                quotes.append(chunk.strip('\n '))
                chunk = ''
            elif (line == '' and chunk == '') :
                add = False
            if (add):
                # print('hello')
                chunk += line + ' '
        if ('BOOK TWO' in line):
            book_start = True
    for index, quote in enumerate(quotes):
        if (quote == '' or quote == '\n'):
            del quotes[index]
    # print(quotes)
    # for quote in quotes:
        # print(quote)

c = conn.cursor()
# c.execute("CREATE TABLE `quotes` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `quote_text` INTEGER NOT NULL, `author` TEXT NOT NULL, `match_score` INTEGER NOT NULL, `chosen` INTEGER NOT NULL )")
for quote in quotes:
    c.execute("INSERT INTO `quotes` (quote, author, chosen) VALUES (?, ?, ?)", (quote, 'Marcus Aurelius', 0))
conn.commit()
    