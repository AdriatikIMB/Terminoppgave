from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///restaurant.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
f
# Define models
class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    people = db.Column(db.Integer, nullable=False)
    time = db.Column(db.String(5), nullable=False)
    area = db.Column(db.String(100), nullable=False)

class TakeawayOrder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    dish = db.Column(db.String(100), nullable=False)

# Create the database
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/reservation')
def reservation():
    return render_template('reservation.html')

@app.route('/takeaway')
def takeaway():
    return render_template('takeaway.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/reservations_list')
def reservations_list():
    return render_template('reservations_list.html')

@app.route('/takeaway_list')
def takeaway_list():
    return render_template('takeaway_list.html')

@app.route('/api/reservations', methods=['POST'])
def add_reservation():
    data = request.json
    new_reservation = Reservation(
        name=data['name'],
        people=data['people'],
        time=data['time'],
        area=data['area']
    )
    db.session.add(new_reservation)
    db.session.commit()
    return jsonify({"message": "Reservation added!"}), 201



@app.route('/api/takeaway', methods=['POST'])
def add_takeaway():
    data = request.json
    new_order = TakeawayOrder(
        name=data['name'],
        dish=data['dish']
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Takeaway order added!"}), 201

@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    reservations = Reservation.query.all()
    return jsonify([{
        "name": res.name,
        "people": res.people,
        "time": res.time,
        "area": res.area
    } for res in reservations]), 200

@app.route('/api/takeaway', methods=['GET'])
def get_takeaway():
    orders = TakeawayOrder.query.all()
    return jsonify([{
        "name": order.name,
        "dish": order.dish
    } for order in orders]), 200

if __name__ == '__main__':
    app.run(debug=True)
