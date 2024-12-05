from flask import Flask, render_template, request, redirect, url_for, jsonify
import mysql.connector

app = Flask(__name__)

# Funksjon for databaseforbindelse
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",  # Bruk riktig brukernavn
        password="your_password",  # Bruk riktig passord
        database="restaurant"
    )

# Hjemmeside med skjema for reservasjon
@app.route('/')
def index():
    return render_template('index.html')

# Skjema for reservasjon
@app.route('/reservation', methods=['GET', 'POST'])
def reservation():
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        people = request.form['people']
        date = request.form['date']
        time = request.form['time']
        area = request.form['area']

        # Lagre reservasjonen i databasen
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO reservations (name, phone, people, date, time, area) VALUES (%s, %s, %s, %s, %s, %s)",
                       (name, phone, people, date, time, area))
        conn.commit()
        cursor.close()
        conn.close()

        return redirect(url_for('contact', name=name))  # Etter reservasjonen er sendt, gå til kontaktinformasjonsskjemaet

    return render_template('reservation.html')

# Skjema for kontaktinformasjon
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    print("TEST!!!")
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        message = request.form['message']

        # Lagre kontaktinformasjonen i databasen
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO contact_info (name, email, phone, message) VALUES (%s, %s, %s, %s)",
                       (name, email, phone, message))
        conn.commit()
        cursor.close()
        conn.close() 

    return render_template('contact.html')

# Vise alle reservasjoner (for administrasjon)
@app.route('/reservations')
def reservations():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM reservations")
    reservations = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('reservations_list.html', reservations=reservations)

if __name__ == '__main__':
    app.run(debug=True)
