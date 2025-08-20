import sqlite3
from flask import Flask, jsonify, request, abort, render_template
from argparse import ArgumentParser
from flask_socketio import SocketIO, emit
# import eventlet
# import eventlet.wsgi
from argparse import ArgumentParser

app = Flask(__name__)

DB = 'serverDb.sqlite'
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()

    required_fields = ['name', 'email', 'password', 'confirmPassword']
    missing_fields = [field for field in required_fields if not data.get(field)]

    if missing_fields:
        return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

    if data['password'] != data['confirmPassword']:
        return jsonify({'error': 'Passwords do not match'}), 400

    try:
        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        """, (data['name'], data['email'], data['password']))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Sign up successfully. Please proceed to login'}), 201

    except Exception as e:
        return jsonify({'error': 'Server error, please try again later.'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    required_fields = ['email', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing email or password'}), 400

    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ?', (data['email'],))
    user = cursor.fetchone()

    if not user:
        return jsonify({'error': 'Invalid email or password'}), 400

    if data['password'] == user['password']:
        user_data = {
            'id': user['id'],
            'name': user['name'],
            'email': user['email']
        }
        return jsonify({'message': 'Login successful', 'user': user_data}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 400
    
@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()

    if 'email' not in data or not data['email']:
        return jsonify({'error': 'Email is required'}), 400

    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT password FROM users WHERE email = ?', (data['email'],))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({'error': 'Email not found'}), 404

    return jsonify({'password': user['password']}), 200

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('password')

    if not email or not new_password:
        return jsonify({'error': 'Missing email or password'}), 400

    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    if not user:
        conn.close()
        return jsonify({'error': 'Email not found'}), 404

    cursor.execute("UPDATE users SET password = ? WHERE email = ?", (new_password, email))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Password updated successfully'}), 200


def get_product_row_as_dict(row):
    print(row)
    return {
        'id': row[0],
        'userId': row[1],
        'name': row[2],
        'price': row[3],
        'description': row[4],
        'date': row[5],
        'imageUri': row[6]
    }

@socketio.on('connect', namespace='/products')
def handle_connect_products(): 
    print('Connected to /products')

def get_products(userId=None):
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    print(userId)
    if userId:
        cursor.execute('SELECT * FROM products WHERE userId = ? ORDER BY id', (userId,))
    else:
        cursor.execute('SELECT * FROM products ORDER BY id')
    rows = cursor.fetchall()
    conn.close()

    products = [get_product_row_as_dict(row) for row in rows]
    return products

@socketio.on('productList', namespace='/products')
def handle_product_list():
    print('Received productList request from client')
    products = get_products()
    print('Emitting product list:', products)
    emit('productList', products, broadcast=True, namespace='/products')

@app.route('/api/products', methods=['POST'])
def web_base_products():
    data = request.get_json()
    print(data)
    products = get_products(data['userId'])
    return jsonify(products), 200

@app.route('/api/products/add', methods=['POST'])
def add_product():
    data = request.get_json()

    required_fields = ['userId', 'productName', 'productPrice', 'productDescription', 'currentDate', 'imageUri2']
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

    try:
        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO products (userId, name, price, description, date, imageUri)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (data['userId'], data['productName'], data['productPrice'], data['productDescription'], data['currentDate'], data['imageUri2']))

        conn.commit()
        conn.close()
        handle_product_list()
        return jsonify({'message': 'Successful to add product'}), 201

    except Exception as e:
        print(e)
        return jsonify({'error': 'Server error, please try again later.'}), 500
    
@app.route('/api/products/update', methods=['PUT'])
def update_product():
    data = request.get_json()
    if not data or 'id' not in data:
        abort(400, 'Missing product id')
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE products
           SET name = ?, price = ?, description = ?, imageUri = ?
         WHERE id = ?
    """, (
        data['name'],
        data['price'],
        data['description'],
        data['imageUri'],
        data['id']
    ))
    if cursor.rowcount == 0:
        conn.close()
        abort(404, 'Product not found')
    conn.commit()
    conn.close()
    handle_product_list()
    return jsonify({ 'message': 'Product updated successfully' }), 200

@app.route('/api/products/delete', methods=['DELETE'])
def delete_product():
    data = request.get_json()
    if not data or 'id' not in data:
        abort(400, 'Missing product id')

    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM products WHERE id = ?", (data['id'],))
    if cursor.rowcount == 0:
        conn.close()
        abort(404, 'Product not found')

    conn.commit()
    conn.close()

    handle_product_list()
    return jsonify({'message': 'Product deleted successfully'}), 200

@app.route('/api/user/profile', methods=['GET'])
def get_user_profile():
    user_id = request.args.get('userId')
    if not user_id:
        abort(400, 'Missing userId')

    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute(
        'SELECT id, name, email, avatar FROM users WHERE id = ?',
        (user_id,)
    )
    row = cursor.fetchone()
    conn.close()

    if not row:
        abort(404, 'User not found')

    return jsonify(dict(row)), 200

@app.route('/api/carts/add', methods=['POST'])
def add_cart():
    data = request.get_json()

    required_fields = ['userId', 'productId']
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

    try:
        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT * FROM carts WHERE userId = ? AND productId = ?
        """, (data['userId'], data['productId']))
        result = cursor.fetchone()
        if result:
            cursor.execute("""
                UPDATE carts
                SET qty = qty + 1
                WHERE id = ?
            """, (result[0],))
        else:
            cursor.execute("""
                INSERT INTO carts (
                    userId, productId, qty
                )
                VALUES (?, ?, ?)
            """, (
                data['userId'],
                data['productId'],
                1
            ))

        conn.commit()
        conn.close()
        return jsonify({'message': 'Successfully added to cart'}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Server error, please try again later.'}), 500

@app.route('/api/carts', methods=['POST'])
def carts():
    data = request.get_json()
    print(data)
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute('SELECT carts.*, products.id as product_id, products.name, products.price, products.description, products.imageUri, products.userId as user_id FROM carts LEFT JOIN products on products.id = carts.productId WHERE carts.userId = ? ORDER BY id', (data['userId'],))
    
    rows = cursor.fetchall()
    conn.close()

    carts = [get_cart_row_as_dict(row) for row in rows]
    return jsonify(carts), 200

def get_cart_row_as_dict(row):
    print(row)
    return {
        'cartId': row[0],
        'userId': row[1],
        'productId': row[2],
        'qty': row[3],
        'cartDate': row[4],
        'product': {
            'id': row[5],
            'name': row[6],
            'price': row[7],
            'description': row[8],
            'imageUri': row[9]
        }
    }

@app.route('/api/carts/delete', methods=['DELETE'])
def delete_cart():
    data = request.get_json()
    if not data or 'id' not in data:
        return jsonify({'message': 'Cart not found'}), 200

    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM carts WHERE id = ?", (data['id'],))
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'message': 'Cart not found'}), 200

    conn.commit()
    conn.close()

    return jsonify({'message': 'Cart deleted successfully'}), 200

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    print(f"Running Flask server on port {port}")
    socketio.run(app, host='0.0.0.0', port=5000)