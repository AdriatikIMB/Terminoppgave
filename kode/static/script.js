document.addEventListener('DOMContentLoaded', () => {
    // Fyller inn tilgjengelige tider for reservasjoner
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

    while (currentTime <= endTime) {
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
    event.preventDefault();

    const takeawayData = {
        name: document.getElementById('takeawayName').value,
        dish: document.getElementById('takeawayDish').value
    };

    const response = await fetch('/takeaway_orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(takeawayData)
    });

    if (response.ok) {
        alert('Takeaway-bestilling bekreftet!');
    } else {
        alert('Noe gikk galt med takeaway-bestillingen.');
    }
}
