// Handle reservation submission
document.getElementById('reservationForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form
    const name = document.getElementById('name').value;
    const people = parseInt(document.getElementById('people').value);
    const time = document.getElementById('time').value;

    // Name validation: Only letters and spaces
    const namePattern = /^[a-zA-ZæøåÆØÅ\s]+$/;
    if (!namePattern.test(name)) {
        alert("Navnet kan bare inneholde bokstaver og mellomrom.");
        return;
    }

    // Check that the number of people is 8 or fewer
    if (people > 8) {
        alert("Maksimalt antall personer per reservasjon er 8.");
        return;
    }

    // Check that the time is between 15:30 and 22:00
    const minTime = "15:30";
    const maxTime = "22:00";
    if (time < minTime || time > maxTime) {
        alert("Tidspunkt må være mellom 15:30 og 22:00.");
        return;
    }

    // If all validations pass, send data to backend
    fetch('/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, people, time, area: document.getElementById('area').value })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('reservationForm').reset();
    })
    .catch(error => console.error('Error:', error));
});

// Function to display reservations
function displayReservations() {
    fetch('/api/reservations')
        .then(response => response.json())
        .then(data => {
            const reservationsList = document.getElementById('reservations');
            reservationsList.innerHTML = ''; // Clear the list
            data.forEach(booking => {
                const li = document.createElement('li');
                li.textContent = `Navn: ${booking.name}, Antall personer: ${booking.people}, Tidspunkt: ${booking.time}, Område: ${booking.area}`;
                reservationsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching reservations:', error));
}

// Handle takeaway order submission
document.getElementById('takeawayForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('takeawayName').value;
    const dish = document.getElementById('dish').value;

    // Validate name
    const namePattern = /^[a-zA-ZæøåÆØÅ\s]+$/;
    if (!namePattern.test(name)) {
        alert("Navnet kan bare inneholde bokstaver og mellomrom.");
        return;
    }

    // Send data to backend
    fetch('/api/takeaway', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, dish })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('takeawayForm').reset();
    })
    .catch(error => console.error('Error:', error));
});

// Function to display takeaway orders
function displayTakeawayOrders() {
    fetch('/api/takeaway')
        .then(response => response.json())
        .then(data => {
            const takeawayList = document.getElementById('takeawayOrders');
            takeawayList.innerHTML = ''; // Clear the list
            data.forEach(order => {
                const li = document.createElement('li');
                li.textContent = `Navn: ${order.name}, Rett: ${order.dish}`;
                takeawayList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
}
