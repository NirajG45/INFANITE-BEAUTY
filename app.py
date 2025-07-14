from flask import Flask, render_template, request, redirect, flash
import sqlite3

app = Flask(__name__)
app.secret_key = "your_secret_key"

# --- Initialize SQLite DB ---
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

# --- Home Route ---
@app.route('/')
def home():
    return render_template("index.html")  # Full updated template with all sections

# --- Order Booking Handler ---
@app.route('/book', methods=['POST'])
def book():
    name = request.form.get('name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    product = request.form.get('product')

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

# --- Admin View to See All Bookings ---
@app.route('/admin')
def admin():
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM bookings")
    rows = cur.fetchall()
    conn.close()
    return render_template("admin.html", bookings=rows)

# --- Run App ---
if __name__ == '__main__':
    app.run(debug=True)
