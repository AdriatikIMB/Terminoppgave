from flask import Blueprint, request, render_template

# Definer en Blueprint for kontaktskjemaet
contact_bp = Blueprint('contact', __name__)

# Rute for å vise kontaktskjemaet
@contact_bp.route('/contact', methods=['GET'])
def contact_form():
    return render_template('contact.html')

# Rute for å behandle kontaktskjemaet
@contact_bp.route('/submit_contact', methods=['POST'])
def submit_contact():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']
    
    # Her kan du lagre meldingen eller gjøre noe annet med den
    print(f"Navn: {name}, E-post: {email}, Melding: {message}")
    
    # Returner en bekreftelse til brukeren
    return "Takk for at du kontaktet oss! Vi vil svare deg snart."
