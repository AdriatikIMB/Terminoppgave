document.addEventListener('DOMContentLoaded', () => {
    // Populerer tidspunktene i 15-minutters intervaller
    populateTimeSlots();

    // Håndterer innsending av reservasjonsskjemaet
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }

    // Håndterer innsending av takeaway-skjemaet
    const takeawayForm = document.getElementById('takeawayForm');
    if (takeawayForm) {
        takeawayForm.addEventListener('submit', handleTakeawaySubmit);
    }
});

// Funksjon for å generere 15-minutters tidsintervaller fra 15:30 til 22:00
function populateTimeSlots() {
    const timeSelect = document.getElementById('time');
    if (!timeSelect) return;

    let currentTime = new Date();
    currentTime.setHours(15, 30, 0, 0);

    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0);

    while (currentTime <= endTime) {
        const timeOption = document.createElement('option');
        timeOption.value = timeOption.textContent = currentTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        timeSelect.appendChild(timeOption);
        currentTime.setMinutes(currentTime.getMinutes() + 15);
    }
}

// Funksjon for å håndtere innsending av reservasjoner
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
            alert('Noe gikk galt. Prøv igjen.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Serverfeil. Prøv igjen senere.');
    }
}

// Funksjon for å håndtere innsending av takeaway-bestillinger
async function handleTakeawaySubmit(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('takeawayName').value,
        dish: document.getElementById('dish').value
    };

    try {
        const response = await fetch('/takeaway', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Takeaway-bestilling ble registrert!');
            takeawayForm.reset();
        } else {
            alert('Noe gikk galt. Prøv igjen.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Serverfeil. Prøv igjen senere.');
    }
}

// Funksjon for å vise alle reservasjoner
async function displayReservations() {
    try {
        const response = await fetch('/reservations_list');
        if (response.ok) {
            const data = await response.json();
            const reservationsList = document.getElementById('reservations');
            reservationsList.innerHTML = ''; // Tømmer eksisterende liste

            data.reservations.forEach(reservation => {
                const listItem = document.createElement('li');
                listItem.textContent = `${reservation.date} - ${reservation.time} | ${reservation.name}, ${reservation.people} personer, Område: ${reservation.area}`;
                reservationsList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Kunne ikke laste reservasjoner.');
    }
}

// Funksjon for å vise alle takeaway-bestillinger
async function displayTakeawayOrders() {
    try {
        const response = await fetch('/takeaway_list');
        if (response.ok) {
            const data = await response.json();
            const takeawayList = document.getElementById('takeawayList');
            takeawayList.innerHTML = ''; // Tømmer eksisterende liste

            data.takeawayOrders.forEach(order => {
                const listItem = document.createElement('li');
                listItem.textContent = `Navn: ${order.name} | Rett: ${order.dish}`;
                takeawayList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Kunne ikke laste takeaway-bestillinger.');
    }
}
