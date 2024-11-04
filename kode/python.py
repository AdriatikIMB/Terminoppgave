from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

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

@app.route('/takeaway')
def takeaway():
    return render_template('takeaway.html')

@app.route('/reservations_list', methods=['GET'])
def get_reservations_list():
    return jsonify({'reservations': reservations})

@app.route('/takeaway_list', methods=['GET'])
def get_takeaway_list():
    return jsonify({'takeawayOrders': takeaway_orders})

@app.route('/reservations', methods=['POST'])
def add_reservation():
    data = request.json
    area = data['area']
    people = data['people']

    current_count = sum(r['people'] for r in reservations if r['area'] == area)
    if current_count + people > 50:
        return jsonify({'success': False, 'error': 'Dette sitteområdet er fullt.'}), 400

    reservation = {
        'name': data['name'],
        'people': people,
        'date': data['date'],
        'time': data['time'],
        'area': area
    }
    reservations.append(reservation)
    return jsonify({'success': True})

@app.route('/takeaway', methods=['POST'])
def add_takeaway():
    data = request.json
    order = {
        'name': data['name'],
        'dish': data['dish'],
    }
    takeaway_orders.append(order)
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
