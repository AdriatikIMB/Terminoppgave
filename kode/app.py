from flask import Flask, render_template, request, jsonify, redirect, url_for
from datetime import datetime, timedelta
import mysql.connector

app = Flask(__name__)

# 📌 Database-tilkobling
def get_db_connection():
    return mysql.connector.connect(
        user="adriatik",
        password="Adriatik.123",
        database="restaurant",
        host="10.2.4.76",
        port=3306
    )

# 📌 Hjemmeside
@app.route('/')
def index():
    return render_template('index.html')

# 📌 Meny-side
@app.route('/menu')
def menu():
    return render_template('menu.html')

# 📌 Kontakt-skjema
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
            cursor.execute("INSERT INTO contact_info (name, email, phone, message) VALUES (%s, %s, %s, %s)",
                           (name, email, phone, message))
            conn.commit()
            cursor.close()
            conn.close()
            return "Takk for at du kontaktet oss!"
        except Exception as e:
            print(f"Error: {e}")
            return "Feil ved innsending av skjema. Prøv igjen.", 500

    return render_template('contact.html')

# 📌 Reservasjonsskjema
@app.route('/reservation', methods=['GET', 'POST'])
def reservation():
    if request.method == 'POST':
        try:
            name = request.form['name']
            phone = request.form['phone']
            people = int(request.form['people'])
            date = request.form['date']
            time = request.form['time']

            reservation_date = datetime.strptime(date, "%Y-%m-%d").date()
            today = datetime.today().date()
            max_date = today + timedelta(days=30)

            if reservation_date < today or reservation_date > max_date:
                return "Datoen må være innenfor 30 dager fra i dag.", 400

            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO reservasjoner (name, phone, people, date, time) VALUES (%s, %s, %s, %s, %s)",
                           (name, phone, people, date, time))
            conn.commit()
            cursor.close()
            conn.close()
            return redirect(url_for('reservasjoner'))
        except Exception as e:
            print(f"Error: {e}")
            return "Feil ved reservasjon. Prøv igjen.", 500

    return render_template('reservation.html')

# 📌 Vis alle reservasjoner
@app.route('/reservasjoner')
def reservasjoner():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)  # Henter resultater som ordbøker
        cursor.execute("SELECT name, phone, people, date, time FROM reservasjoner ORDER BY date, time")
        reservasjoner = cursor.fetchall()
        cursor.close()
        conn.close()
        return render_template('reservasjoner.html', reservasjoner=reservasjoner)
    except Exception as e:
        print(f"Error: {e}")
        return "Feil ved henting av reservasjoner.", 500

# 📌 Takeaway-bestilling
@app.route('/takeaway', methods=['GET', 'POST'])
def takeaway():
    if request.method == 'POST':
        data = request.json
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO takeaway_orders (name, dish) VALUES (%s, %s)", (data['name'], data['dish']))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

    return render_template('takeaway.html')

if __name__ == '__main__':
    app.run(debug=True)
