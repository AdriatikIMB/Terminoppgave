document.addEventListener('DOMContentLoaded', () => {
    // Fyller inn tilgjengelige tider for reservasjoner
    populateTimeSlots();

    const reservationForm = document.getElementById('reservationForm');
    const nextButton = document.getElementById('nextButton');
    
    if (reservationForm) {
        // Legger til en "input" event listener for alle relevante felter
        reservationForm.addEventListener('input', validateForm);
        // Kjører validering ved første last for å sjekke om knappen skal være aktivert eller ikke
        validateForm();
    }

    // Legger til funksjonalitet for "Neste"-knappen
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            // Når brukeren klikker på "Neste", naviger til kontaktinformasjon-siden
            window.location.href = "/contact";  // Dette åpner kontaktinformasjon-siden
        });
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
    maxStartTime.setHours(22, 0, 0); // Den siste mulige starttiden for 4 timer varighet (18:00 for 22:00 slutt)

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

// Funksjon for å validere skjemaet
function validateForm() {
    const area = document.getElementById('area');
    const people = document.getElementById('people');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    
    const nextButton = document.getElementById('nextButton');
    
    // Sjekk om alle nødvendige felter er fylt ut
    if (area.value && people.value && date.value && time.value) {
        // Aktiver "Neste"-knappen hvis alle nødvendige felter er fylt ut
        nextButton.disabled = false;
    } else {
        // Deaktiver "Neste"-knappen hvis et av de nødvendige feltene er tomt
        nextButton.disabled = true;
    }
}
