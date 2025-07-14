from flask import Flask, render_template, request, redirect, flash, session, url_for
import sqlite3

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Keep it secret in production

# ---------- DB Setup ----------
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

# ---------- Routes ----------
@app.route('/')
def home():
    return render_template("index.html")

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
    else:
        flash("❌ Please fill in all fields.")
    return redirect('/')

# ---------- Admin Login ----------
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")

        if username == "admin" and password == "admin123":
            session['admin'] = True
            return redirect('/admin')
        else:
            flash("❌ Invalid credentials. Try again.")
            return redirect('/admin/login')

    return render_template("admin_login.html")

# ---------- Admin Logout ----------
@app.route('/admin/logout')
def admin_logout():
    session.pop('admin', None)
    flash("👋 You have been logged out.")
    return redirect('/admin/login')

# ---------- Admin Dashboard ----------
@app.route('/admin')
def admin():
    if not session.get('admin'):
        flash("🔒 Please login to access admin dashboard.")
        return redirect('/admin/login')

    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM bookings")
    rows = cur.fetchall()
    conn.close()
    return render_template("admin.html", bookings=rows)

# ---------- Run App ----------
if __name__ == '__main__':
    app.run(debug=True)
