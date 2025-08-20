import sqlite3
db = sqlite3.connect('serverDb.sqlite')

# db.execute('''CREATE TABLE users (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name TEXT NOT NULL,
#     email TEXT NOT NULL,
#     password TEXT NOT NULL
# )''')

# db.execute('''CREATE TABLE products (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     userId INTEGER,
#     name TEXT NOT NULL,
#     price DECIMAL(11,2) NOT NULL,
#     description TEXT,
#     date DATETIME,
#     imageUri TEXT
# )''')

db.execute('''CREATE TABLE carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    productId INTEGER,
    qty INTEGER,
    date DATETIME
)''')

# cursor = db.cursor()

db.commit()
db.close()

# db = sqlite3.connect('localDb.sqlite')

# db.execute('''CREATE TABLE users (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name TEXT NOT NULL,
#     email TEXT NOT NULL
# )''')

# cursor = db.cursor()

# db.commit()
# db.close()