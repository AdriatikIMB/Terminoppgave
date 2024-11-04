from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

# In-memory data storage for reservations and takeaway orders
reservations = []
takeaway_orders = []

def generate_available_times(start_time="15:30", end_time="22:00", interval=30):
    """Generer tilgjengelige tider mellom start_time og end_time."""
    times = []
    start = datetime.strptime(start_time, "%H:%M")
    end = datetime.strptime(end_time, "%H:%M")
    
    while start <= end:
        times.append(start.strftime("%H:%M"))
        start += timedelta(minutes=interval)
    return times

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/reservation')
def reservation():
    return render_template('reservation.html', available_times=generate_available_times())

@app.route('/takeaway')
def takeaway():
    return render_template('takeaway.html')

@app.route('/reservations', methods=['POST'])
def add_reservation():
    data = request.json
    area = data['area']
    people = data['people']

    current_count = sum(r['people'] for r in reservations if r['area'] == area)
    available_seats = 50 - current_count

    if current_count + people > 50:
        return jsonify({'success': False, 'error': f'Dette sitteområdet er fullt. Tilgjengelige plasser: {available_seats}'}), 500

    reservation = {
        'name': data['name'],
        'phone': data['phone'],
        'people': people,
        'date': data['date'],
        'time': data['time'],
        'area': area
    }
    reservations.append(reservation)
    return jsonify({'success': True, 'available_seats': available_seats - people})

@app.route('/reservations_list', methods=['GET'])
def reservations_list():
    return jsonify({'reservations': reservations})

@app.route('/takeaway', methods=['POST'])
def add_takeaway_order():
    data = request.json
    order = {
        'name': data['name'],
        'dish': data['dish']
    }

    # Legg til bestilling til takeaway_orders
    takeaway_orders.append(order)  # Lagre takeaway-bestillingen separat
    return jsonify({'success': True})

@app.route('/takeaway_list', methods=['GET'])
def takeaway_list():
    return jsonify({'takeawayOrders': takeaway_orders})

if __name__ == '__main__':
    app.run(debug=True)
