from flask import Flask, render_template, request, redirect, url_for, jsonify
import mysql.connector
from datetime import datetime, timedelta

app = Flask(__name__)

# Database connection details
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",  # Replace with your MySQL username
        password="your_password",  # Replace with your MySQL password
        database="restaurant"
    )

# Home page
@app.route('/')
def index():
    return render_template('index.html')

# Menu page
@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')


# Reservation page
@app.route('/reservation', methods=['GET', 'POST'])
def reservation():
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        people = request.form['people']
        date = request.form['date']
        time = request.form['time']
        area = request.form['area']

        # Insert reservation into the database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO reservations (name, phone, people, date, time, area) VALUES (%s, %s, %s, %s, %s, %s)",
                       (name, phone, people, date, time, area))
        conn.commit()
        cursor.close()
        conn.close()

        return redirect(url_for('index'))

    return render_template('reservation.html')

# View all reservations
@app.route('/reservations')
def reservations():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM reservations")
    reservations = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('reservations_list.html', reservations=reservations)



# Takeaway page
@app.route('/takeaway')
def takeaway():
    return render_template('takeaway.html')

# Handle takeaway orders
@app.route('/takeaway_orders', methods=['POST'])
def add_takeaway_order():
    data = request.json
    name = data['name']
    dish = data['dish']

    # Insert order into the database
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO takeaway_orders (name, dish) VALUES (%s, %s)", (name, dish))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'success': True})

# View all takeaway orders
@app.route('/takeaway_list')
def takeaway_list():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM takeaway_orders")
    takeaway_orders = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('takeaway_list.html', takeaway_orders=takeaway_orders)

if __name__ == '__main__':
    app.run(debug=True)
