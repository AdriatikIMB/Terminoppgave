# Restaurant Web Application

Dette er et web-applikasjonssystem for et restaurant, som gjør det mulig for kunder å reservere bord, se menyen, bestille takeaway og kontakte restauranten for spørsmål eller kommentarer.

## Funksjoner

- **Reservasjonssystem**: Brukerne kan reservere bord online ved å velge antall personer, dato og tidspunkt.
- **Restaurantmeny**: Brukerne kan se restaurantens meny og de tilgjengelige rettene med priser.
- **Takeaway-bestilling**: Brukere kan bestille takeaway-retter direkte gjennom nettstedet.
- **Kontaktformular**: Brukerne kan sende inn spørsmål eller tilbakemeldinger via et kontaktskjema som lagres i databasen.
- **Responsiv design**: Nettstedet er responsivt og fungerer på både desktop og mobile enheter.

## Teknologier

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS (for stil), JavaScript (for dynamisk funksjonalitet)
- **Database**: MySQL
- **Webserver**: Flask server
- **Frontend Design**: Enkelt og moderne design med fokus på brukeropplevelse.

## Komme i gang

Følg trinnene nedenfor for å sette opp applikasjonen på din lokale maskin.

### Forutsetninger

- Python 3.x
- MySQL server
- En nettleser som støtter HTML5 og CSS3

Hovedmeny: Når du åpner applikasjonen i nettleseren, vil du se hovedmenyen med alternativer for å reservere bord, se menyen og bestille takeaway.
Reserver bord: Klikk på "Reserver bord"-knappen og fyll ut skjemaet for å gjøre en reservasjon.
Se menyen: Klikk på "Vis restaurantmeny"-knappen for å se tilgjengelige retter og deres priser.
Bestill takeaway: Velg en rett fra takeaway-menyen og fyll ut informasjonen for bestillingen.
Kontakt oss: Klikk på "Kontakt oss"-seksjonen for å sende inn spørsmål eller tilbakemeldinger.


Her er en utvidet versjon av README.md for prosjektet ditt. Denne inkluderer mer detaljer om prosjektet, hvordan du setter opp og bruker det, samt informasjon om funksjonene og teknologiene som er brukt.

markdown
Kopier kode
# Restaurant Web Application (RWADME)

Dette er et web-applikasjonssystem for et restaurant, som gjør det mulig for kunder å reservere bord, se menyen, bestille takeaway og kontakte restauranten for spørsmål eller kommentarer.

## Funksjoner

- **Reservasjonssystem**: Brukerne kan reservere bord online ved å velge antall personer, dato og tidspunkt.
- **Restaurantmeny**: Brukerne kan se restaurantens meny og de tilgjengelige rettene med priser.
- **Takeaway-bestilling**: Brukere kan bestille takeaway-retter direkte gjennom nettstedet.
- **Kontaktformular**: Brukerne kan sende inn spørsmål eller tilbakemeldinger via et kontaktskjema som lagres i databasen.
- **Responsiv design**: Nettstedet er responsivt og fungerer på både desktop og mobile enheter.

## Teknologier

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS (for stil), JavaScript (for dynamisk funksjonalitet)
- **Database**: MySQL
- **Webserver**: Flask server
- **Frontend Design**: Enkelt og moderne design med fokus på brukeropplevelse.

## Komme i gang

Følg trinnene nedenfor for å sette opp applikasjonen på din lokale maskin.

### Forutsetninger

- Python 3.x
- MySQL server
- En nettleser som støtter HTML5 og CSS3

### Installere

1. Klon dette repository:
   ```bash
   git clone https://github.com/brukernavn/restaurant-web-app.git
Naviger til prosjektmappen:

bash
Kopier kode
cd restaurant-web-app
Installer nødvendige Python-pakker:

bash
Kopier kode
pip install -r requirements.txt
Opprett en MySQL-database med følgende kommando:

sql
Kopier kode
CREATE DATABASE restaurant;
Opprett tabellene som trengs for applikasjonen i databasen:

sql
Kopier kode
CREATE TABLE contact_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    message TEXT
);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20),
    people INT,
    date DATE,
    time TIME
);

CREATE TABLE takeaway_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    dish VARCHAR(100)
);
Sett opp Flask-applikasjonen:

Rediger config.py (hvis den eksisterer) eller sett nødvendige miljøvariabler for å koble til din MySQL-database (bruk riktig vert, port, brukernavn og passord).
Start Flask-serveren:

bash
Kopier kode
flask run
Serveren bør være tilgjengelig på http://localhost:5000.

### Bruk
Hovedmeny: Når du åpner applikasjonen i nettleseren, vil du se hovedmenyen med alternativer for å reservere bord, se menyen og bestille takeaway.
Reserver bord: Klikk på "Reserver bord"-knappen og fyll ut skjemaet for å gjøre en reservasjon.
Se menyen: Klikk på "Vis restaurantmeny"-knappen for å se tilgjengelige retter og deres priser.
Bestill takeaway: Velg en rett fra takeaway-menyen og fyll ut informasjonen for bestillingen.
Kontakt oss: Klikk på "Kontakt oss"-seksjonen for å sende inn spørsmål eller tilbakemeldinger.
Funksjoner
Reservasjon
Brukeren kan velge dato og tidspunkt for reservasjonen, samt spesifisere antall personer.
Datoen kan ikke være tidligere enn dagens dato, og tidspunktet er tilgjengelig i intervaller på 15 minutter.
Takeaway
Brukeren kan velge en rett fra menyen og sende bestillingen direkte til restauranten.
Systemet lagrer bestillinger i databasen og bekrefter bestillingen via en respons.
Kontakt oss
Brukeren kan fylle ut et skjema med navn, e-post, telefonnummer og en melding. Dataene sendes til databasen for videre behandling.

### Feilsøking

1. Flask serveren starter ikke
Sjekk at du har installert alle nødvendige avhengigheter via pip install -r requirements.txt.
Sørg for at MySQL-serveren er i gang og at du har riktig konfigurert tilkoblingen i app.py.

3. Databasefeil
Sørg for at tabellene er korrekt opprettet i MySQL.
Sjekk at du bruker riktig databasebruker og passord i appen.

5. Feil i brukergrensesnittet
Hvis det er problemer med at tidspunktene for reservasjon ikke vises eller skjemaene ikke sendes inn riktig, sjekk JavaScript-koden som håndterer skjemaet og tidspunktene.

