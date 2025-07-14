from flask import Flask, render_template, request, redirect, flash
import sqlite3

app = Flask(__name__)
app.secret_key = "your_secret_key"

def init_db():
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            product TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/book', methods=['POST'])
def book():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    product = request.form['product']

    if name and email and phone and product:
        conn = sqlite3.connect("database.db")
        cur = conn.cursor()
        cur.execute("INSERT INTO bookings (name, email, phone, product) VALUES (?, ?, ?, ?)",
                    (name, email, phone, product))
        conn.commit()
        conn.close()
        flash("✅ Booking successful! We'll contact you soon.")
        return redirect('/')
    else:
        flash("❌ Please fill in all fields.")
        return redirect('/')

@app.route('/admin')
def admin():
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM bookings")
    rows = cur.fetchall()
    conn.close()
    return render_template("admin.html", bookings=rows)

if __name__ == '__main__':
    app.run(debug=True)