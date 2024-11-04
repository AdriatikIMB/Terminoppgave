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

@app.route('/reservation')
def reservation():
    return render_template('reservation.html')

@app.route('/reservations', methods=['POST'])
def add_reservation():
    data = request.json
    area = data['area']
    people = data['people']

    # Sjekk datoen
    reservation_date = datetime.strptime(data['date'], "%Y-%m-%d").date()
    today = datetime.today().date()
    max_date = today + timedelta(days=30)

    if reservation_date < today or reservation_date > max_date:
        return jsonify({'success': False, 'error': f'Datoen må være i fremtiden og innen 30 dager.'}), 400

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

if __name__ == '__main__':
    app.run(debug=True)
