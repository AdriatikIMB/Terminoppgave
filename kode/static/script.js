// Sett minimum dato til dagens dato når siden lastes
document.addEventListener("DOMContentLoaded", function() {
    const today = new Date().toISOString().split("T")[0]; // Henter dagens dato
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.setAttribute('min', today); // Setter min-verdi for datovelger
    }
});

// Handle reservation submission
document.getElementById('reservationForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form
    const name = document.getElementById('name').value;
    const people = parseInt(document.getElementById('people').value);
    const time = document.getElementById('time').value;
    const date = document.getElementById('date').value; // Hent datoen

    // Name validation: Only letters and spaces
    const namePattern = /^[a-zA-ZæøåÆØÅ\s]+$/;
    if (!namePattern.test(name)) {
        alert("Navnet kan bare inneholde bokstaver og mellomrom.");
        return;
    }

    // Check that the number of people is within a reasonable range
    if (people < 1 || people > 20) {
        alert("Antall personer må være mellom 1 og 20.");
        return;
    }

    // Submit reservation data via Fetch API
    fetch('/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time, name, people }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Reservasjonen ble bekreftet!");
            document.getElementById('reservationForm').reset(); // Reset the form
        } else {
            alert("Det oppstod en feil ved bekreftelse av reservasjonen.");
        }
    })
    .catch(error => console.error('Error:', error));
});

// Handle takeaway order submission
document.getElementById('takeawayForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('takeawayName').value;
    const dish = document.getElementById('dish').value;

    // Name validation
    const namePattern = /^[a-zA-ZæøåÆØÅ\s]+$/;
    if (!namePattern.test(name)) {
        alert("Navnet kan bare inneholde bokstaver og mellomrom.");
        return;
    }

    // Submit takeaway order
    fetch('/takeaway', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, dish }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Takeaway-bestillingen ble bekreftet!");
            document.getElementById('takeawayForm').reset();
        } else {
            alert("Det oppstod en feil ved bekreftelse av bestillingen.");
        }
    })
    .catch(error => console.error('Error:', error));
});

// Display reservations
function displayReservations() {
    fetch('/reservations_list')
    .then(response => response.json())
    .then(data => {
        const reservationsList = document.getElementById('reservations');
        reservationsList.innerHTML = ''; // Clear existing entries
        data.reservations.forEach(reservation => {
            const li = document.createElement('li');
            li.textContent = `${reservation.name} - ${reservation.date} ${reservation.time} for ${reservation.people} people`;
            reservationsList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching reservations:', error));
}

// Display takeaway orders
function displayTakeawayOrders() {
    fetch('/takeaway_list')
    .then(response => response.json())
    .then(data => {
        const takeawayOrdersList = document.getElementById('takeawayOrders');
        takeawayOrdersList.innerHTML = ''; // Clear existing entries
        data.takeawayOrders.forEach(order => {
            const li = document.createElement('li');
            li.textContent = `${order.name} ordered ${order.dish}`;
            takeawayOrdersList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching takeaway orders:', error));
}
