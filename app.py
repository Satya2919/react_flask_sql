from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
DB_PATH = "database.db"

def create_users_table():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                     name TEXT NOT NULL,
                     phone_number TEXT NOT NULL)''')
    conn.commit()
    conn.close()

@app.route('/api/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    name = data.get('name')
    phone_number = data.get('phone_number')

    if not name or not phone_number:
        return jsonify({'error': 'Name and phone number are required.'}), 400

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (name, phone_number) VALUES (?, ?)", (name, phone_number))
    conn.commit()
    conn.close()

    return jsonify({'message': 'User added successfully.'}), 201

@app.route('/api/search_user', methods=['POST'])
def search_user():
    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({'error': 'Name is required.'}), 400

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT phone_number FROM users WHERE name = ?", (name,))
    result = cursor.fetchone()
    conn.close()

    if not result:
        return jsonify({'message': 'User not found.'}), 404

    return jsonify({'phone_number': result[0]}), 200

if __name__ == '__main__':
    create_users_table()
    app.run(debug=True)
