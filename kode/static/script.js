// Handle reservation submission
document.getElementById('reservationForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const people = document.getElementById('people').value;
    const time = document.getElementById('time').value;
    const area = document.getElementById('area').value;

    fetch('/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, people, time, area })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('reservationForm').reset();
    })
    .catch(error => console.error('Error:', error));
});

// Handle takeaway submission
document.getElementById('takeawayForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('takeawayName').value;
    const dish = document.getElementById('dish').value;

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
        });
}

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
        });
}
