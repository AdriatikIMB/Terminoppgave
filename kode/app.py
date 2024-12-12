from flask import Flask, render_template, request, jsonify, redirect, url_for
from datetime import datetime, timedelta
import mysql.connector

app = Flask(__name__)

# Funksjon for databaseforbindelse
def get_db_connection():
    return mysql.connector.connect(
        user="adriatik",
        password="Adriatik.123",
        database="restaurant",
        host="10.2.4.76",  
        port=3306
    )

# Rute for hjem
@app.route('/')
def index():
    return render_template('index.html')

# Rute for meny
@app.route('/menu')
def menu():
    return render_template('menu.html')

# Rute for kontakt
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        message = request.form['message']

        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO contact_info (name, email, phone, message)
                VALUES (%s, %s, %s, %s)
            """, (name, email, phone, message))
            conn.commit()
            cursor.close()
            conn.close()
            return "Takk for at du kontaktet oss! Vi vil svare deg snart."
        except Exception as e:
            print(f"Error: {e}")
            return "Error in sending message. Please try again.", 500

    return render_template('contact.html')

# Rute for reservasjon (GET og POST)
@app.route('/reservation', methods=['GET', 'POST'])
def reservation():
    if request.method == 'POST':
        try:
            name = request.form['name']
            phone = request.form['phone']
            people = int(request.form['people'])
            date = request.form['date']
            time = request.form['time']

            # Validering av dato og tid
            reservation_date = datetime.strptime(date, "%Y-%m-%d").date()
            today = datetime.today().date()
            max_date = today + timedelta(days=30)

            if reservation_date < today or reservation_date > max_date:
                return "Datoen må være innenfor 30 dager fra i dag.", 400

            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO reservations (name, phone, people, date, time)
                VALUES (%s, %s, %s, %s, %s)
            """, (name, phone, people, date, time))
            conn.commit()
            cursor.close()
            conn.close()
            return redirect(url_for('reservation_list'))
        except Exception as e:
            print(f"Error: {e}")
            return "Error in processing reservation. Please try again.", 500

    return render_template('reservation.html')

# Rute for visning av reservasjoner (liste)
@app.route('/reservation_list', methods=['GET'])
def reservation_list():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM reservations")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return render_template('reservation_list.html', reservations=rows)
    except Exception as e:
        print(f"Error: {e}")
        return "Error retrieving reservations.", 500

# Rute for å håndtere takeaway-bestillinger
@app.route('/takeaway')
def takeaway():
    return render_template('takeaway.html')

@app.route('/takeaway_orders', methods=['POST'])
def add_takeaway_order():
    data = request.json
    try:
        # Koble til databasen
        conn = get_db_connection()
        cursor = conn.cursor()

        # Skriv ut dataene som mottas
        print(f"Received order: {data}")

        # Sett inn takeaway-bestilling i databasen
        cursor.execute("""
            INSERT INTO takeaway_orders (name, dish)
            VALUES (%s, %s)
        """, (data['name'], data['dish']))

        # Bekreft og lukk tilkoblingen
        conn.commit()
        cursor.close()
        conn.close()

        # Skriv ut en suksessmelding
        print("Order successfully added to the database.")

        return jsonify({'success': True})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True)
