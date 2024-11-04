document.addEventListener('DOMContentLoaded', () => {
    populateTimeSlots();

    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }
});

// Fyller inn tilgjengelige tider for reservasjoner
function populateTimeSlots() {
    const timeSelect = document.getElementById('time');
    if (!timeSelect) return;

    let currentTime = new Date();
    currentTime.setHours(15, 30, 0, 0); // Starttid

    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0); // Sluttid

    while (currentTime <= endTime) {
        const timeOption = document.createElement('option');
        timeOption.value = timeOption.textContent = currentTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        timeSelect.appendChild(timeOption);
        currentTime.setMinutes(currentTime.getMinutes() + 15); // Øker med 15 minutter
    }
}

// Håndterer innsending av reservasjoner
async function handleReservationSubmit(event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value;

    // Valider telefonnummerformatet
    const phonePattern = /^\+47[0-9]{8}$/;
    if (!phonePattern.test(phone)) {
        alert('Ugyldig telefonnummer. Bruk formatet: +47XXXXXXXX.');
        return;
    }

    const reservationData = {
        name: document.getElementById('name').value,
        phone: phone,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        area: document.getElementById('area').value,
        people: parseInt(document.getElementById('people').value)
    };

    const response = await fetch('/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    });

    if (response.ok) {
        alert('Reservasjon bekreftet!');
    } else {
        const errorData = await response.json();
        alert(`Feil: ${errorData.error}`);
    }
}

// Håndterer innsending av takeaway-bestilling
async function handleTakeawaySubmit(event) {
    event.preventDefault();

    const takeawayData = {
        name: document.getElementById('takeawayName').value,
        dish: document.getElementById('dish').value
        // Vi trenger ikke å inkludere reservationId
    };

    const response = await fetch('/takeaway', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(takeawayData)
    });

    if (response.ok) {
        alert('Takeaway-bestilling bekreftet!');
    }else {
        const errorData = await response.json();
        alert(`Feil: ${errorData.error}`);
    }
}

// Viser alle takeaway-bestillinger
async function displayTakeawayOrders() {
    const response = await fetch('/takeaway_list');
    const data = await response.json();
    const takeawayList = document.getElementById('takeawayList');

    takeawayList.innerHTML = ''; // Tøm listen før vi viser nye data

    data.takeawayOrders.forEach(order => {
        const listItem = document.createElement('li');
        listItem.textContent = `${order.name} bestilte ${order.dish}`;
        takeawayList.appendChild(listItem);
    });
}
