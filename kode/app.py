from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
from datetime import datetime, timedelta

app = Flask(__name__)

# Funksjon for databaseforbindelse
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        port=5000,
        user="adriatik",  
        password="Adriatik.123",  
        database="restaurant"  
    )

@app.route('/')
def index():
    return render_template('index.html')

# Rute for reservasjon
@app.route('/reservation', methods=['GET', 'POST'])
def reservation():
    if request.method == 'POST':
        try:
            name = request.form['name']
            phone = request.form['phone']
            people = int(request.form['people'])
            date = request.form['date']
            time = request.form['time']
            area = request.form.get('area', 'Default')  # Hvis det er et ekstra felt

            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""INSERT INTO reservations (name, phone, people, date, time, area) 
                              VALUES (%s, %s, %s, %s, %s, %s)""", 
                           (name, phone, people, date, time, area))
            conn.commit()
            cursor.close()
            conn.close()
            return redirect(url_for('reservation_list'))
        except Exception as e:
            print(f"Error: {e}")
            return "Error in processing reservation. Please try again.", 500
    return render_template('reservation.html')

# Rute for visning av alle reservasjoner
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

# Rute for kontaktinformasjon
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        message = request.form['message']

        # Logg mottatte data
        print(f"Received data: name={name}, email={email}, phone={phone}, message={message}")
        
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # Logg tilkobling og spørring
            print("Inserting data into contact_info...")
            cursor.execute("""
                INSERT INTO contact_info (name, email, phone, message) 
                VALUES (%s, %s, %s, %s)
            """, (name, email, phone, message))
            
            conn.commit()
            print("Data inserted successfully")
            cursor.close()
            conn.close()

            return "Takk for at du kontaktet oss! Vi vil svare deg snart."
        except Exception as e:
            print(f"Error: {e}")
            return "Error in sending message. Please try again.", 500

    return render_template('contact.html')



if __name__ == '__main__':
    app.run(debug=True)
