from flask import Flask, render_template, request 

app = Flask(__name__)

@app.route("/")
def contact():
    return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True)

    
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        
        # Her kan du lagre data eller sende e-post
        print(f"Navn: {name}, E-post: {email}, Melding: {message}")
        
        return "Takk for at du reserverte bord! Vi vil svare deg snart."
    
    return render_template('contact.html')
