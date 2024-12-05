from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

# In-memory data storage for reservations and takeaway orders
reservations = []
takeaway_orders = []

@app.route('/') 
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/reservation')
def reservation():
    return render_template('reservation.html')

@app.route('/reservations', methods=['POST'])
def add_reservation():
    data = request.json
    people = data['people']
    duration = data['duration']

    # Check the date
    reservation_date = datetime.strptime(data['date'], "%Y-%m-%d").date()
    today = datetime.today().date()
    max_date = today + timedelta(days=30)

    # Ensure the reservation is in the future and within 30 days
    if reservation_date < today or reservation_date > max_date:
        return jsonify({'success': False, 'error': 'Datoen må være i fremtiden og innen 30 dager.'}), 400

    # Calculate end time
    start_time = datetime.strptime(data['time'], "%H:%M")
    end_time = start_time + timedelta(hours=duration)
    end_time_str = end_time.strftime("%H:%M")  # Format end_time as a string

    # Check if the reservation end time exceeds 22:00
    latest_end_time = datetime.strptime('22:00', "%H:%M")
    if end_time > latest_end_time:
        return jsonify({'success': False, 'error': 'Restauranten stenger klokka 22:00.'}), 400

    # Create a new reservation entry
    reservation = {
        'name': data['name'],
        'phone': data['phone'],
        'people': people,
        'date': data['date'],
        'time': data['time'],
        'end_time': end_time_str
    }
    reservations.append(reservation)
    return jsonify({'success': True})

@app.route('/reservations_list', methods=['GET'])
def reservations_list():
    return jsonify({'reservations': reservations})

@app.route('/takeaway')
def takeaway():
    return render_template('takeaway.html')

@app.route('/takeaway_orders', methods=['POST'])
def add_takeaway_order():
    data = request.json
    order = {
        'name': data['name'],
        'dish': data['dish']
    }
    takeaway_orders.append(order)
    return jsonify({'success': True})

@app.route('/takeaway_list', methods=['GET'])
def takeaway_list():
    return jsonify({'takeaway_orders': takeaway_orders})

if __name__ == '__main__':
    app.run(debug=True)
