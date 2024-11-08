document.addEventListener('DOMContentLoaded', () => {
    // Fyller inn tilgjengelige tider for reservasjoner
    populateTimeSlots();

    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }
});

// Fyller inn tilgjengelige tider for reservasjoner
function populateTimeSlots() {
    const timeSelect = document.getElementById('time');
    const dateInput = document.getElementById('date');
    if (!timeSelect || !dateInput) return;

    // Setter dagens dato
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    dateInput.setAttribute('min', todayString);

    // Sett maksimumsdato til én måned frem
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1);
    dateInput.setAttribute('max', maxDate.toISOString().split("T")[0]);

    // Setter opp starttid og sluttid for reservasjoner
    let currentTime = new Date();
    currentTime.setHours(15, 30, 0, 0); // Starttidspunkt for reservasjoner
    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0); // Sluttidspunkt for reservasjoner (kl 22:00)

    // Maks tid for start for å tillate varigheter
    const maxStartTime = new Date();
    maxStartTime.setHours(18, 0, 0); // Den siste mulige starttiden for 4 timer varighet (18:00 for 22:00 slutt)

    while (currentTime <= maxStartTime) {
        const timeOption = document.createElement('option');
        timeOption.value = timeOption.textContent = currentTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        timeSelect.appendChild(timeOption);
        currentTime.setMinutes(currentTime.getMinutes() + 15); // Legg til 15 minutter
    }
}


// Håndterer innsending av reservasjon
async function handleReservationSubmit(event) {
    event.preventDefault();

    // Valider telefonnummerformatet
    const phone = document.getElementById('phone').value;
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
        people: parseInt(document.getElementById('people').value),
        duration: parseInt(document.getElementById('duration').value)  // Legger til varighet
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
    event.preventDefault(); // Hindrer siden fra å laste på nytt

    const name = document.getElementById('takeawayName').value;
    const dish = document.getElementById('dish').value; // Endret fra takeawayDish til dish

    // Sjekk at navn og rett er fylt ut
    if (!name || !dish) {
        alert('Vennligst fyll ut både navn og rett.');
        return;
    }

    const takeawayData = {
        name: name,
        dish: dish
    };

    // Sender dataene til serveren via fetch
    const response = await fetch('/takeaway_orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(takeawayData)
    });

    if (response.ok) {
        alert('Takeaway-bestilling bekreftet!');
        document.getElementById('takeawayForm').reset(); // Tømmer skjemaet etter bestilling
    } else {
        alert('Noe gikk galt med takeaway-bestillingen.');
    }
}

// Funksjon for å vise takeaway-bestillinger (kan brukes på "Vis Takeaway-bestillinger"-knappen)
async function displayTakeawayOrders() {
    const response = await fetch('/takeaway_list', {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        const orders = data.takeaway_orders;
        const listContainer = document.getElementById('takeawayList');
        listContainer.innerHTML = ''; // Tømmer eksisterende liste

        if (orders.length === 0) {
            listContainer.innerHTML = '<li>Ingen takeaway-bestillinger funnet.</li>';
        } else {
            orders.forEach(order => {
                const listItem = document.createElement('li');
                listItem.textContent = `${order.name} bestilte ${order.dish}`;
                listContainer.appendChild(listItem);
            });
        }
    } else {
        alert('Kunne ikke hente takeaway-bestillinger.');
    }
}