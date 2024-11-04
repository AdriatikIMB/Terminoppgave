document.addEventListener('DOMContentLoaded', () => {
    populateTimeSlots();

    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }

    const takeawayForm = document.getElementById('takeawayForm');
    if (takeawayForm) {
        takeawayForm.addEventListener('submit', handleTakeawaySubmit);
    }
});

function populateTimeSlots() {
    const timeSelect = document.getElementById('time');
    if (!timeSelect) return;

    let currentTime = new Date();
    currentTime.setHours(15, 30, 0, 0); // Start time

    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0); // End time

    while (currentTime <= endTime) {
        const timeOption = document.createElement('option');
        timeOption.value = timeOption.textContent = currentTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        timeSelect.appendChild(timeOption);
        currentTime.setMinutes(currentTime.getMinutes() + 15); // Increment by 15 minutes
    }
}

async function handleReservationSubmit(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        people: parseInt(document.getElementById('people').value),
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        area: document.getElementById('area').value
    };

    try {
        const response = await fetch('/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Reservasjonen ble lagt inn!');
            reservationForm.reset();
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Noe gikk galt. Prøv igjen.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Serverfeil. Prøv igjen senere.');
    }
}

async function handleTakeawaySubmit(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('takeawayName').value,
        dish: document.getElementById('dish').value,
    };

    try {
        const response = await fetch('/takeaway', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Bestillingen ble lagt inn!');
            takeawayForm.reset();
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Noe gikk galt. Prøv igjen.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Serverfeil. Prøv igjen senere.');
    }
}

function displayReservations() {
    fetch('/reservations_list')
        .then(response => response.json())
        .then(data => {
            const reservationsList = document.getElementById('reservations');
            reservationsList.innerHTML = ''; // Clear previous content

            data.reservations.forEach(reservation => {
                const li = document.createElement('li');
                li.textContent = `${reservation.name} - ${reservation.people} personer på ${reservation.date} kl ${reservation.time} i ${reservation.area}`;
                reservationsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching reservations:', error);
            alert('Kunne ikke hente reservasjoner.');
        });
}

function displayTakeawayOrders() {
    fetch('/takeaway_list')
        .then(response => response.json())
        .then(data => {
            const takeawayList = document.getElementById('takeawayList');
            takeawayList.innerHTML = ''; // Clear previous content

            data.takeawayOrders.forEach(order => {
                const li = document.createElement('li');
                li.textContent = `${order.name} bestilte ${order.dish}`;
                takeawayList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching takeaway orders:', error);
            alert('Kunne ikke hente takeaway-bestillinger.');
        });
}
