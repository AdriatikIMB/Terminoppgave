# Restaurant Web Application
```bash
Dette er et web-applikasjonssystem for en restaurant, som gjør det mulig for kunder å reservere bord, se menyen, bestille takeaway, og kontakte restauranten for spørsmål eller kommentarer.
```

## Funksjoner
```bash
- **Reservasjonssystem**: Brukerne kan reservere bord online ved å velge antall personer, dato og tidspunkt.
- **Restaurantmeny**: Brukerne kan se restaurantens meny og de tilgjengelige rettene med priser.
- **Takeaway-bestilling**: Brukere kan bestille takeaway-retter direkte gjennom nettstedet.
- **Kontaktformular**: Brukerne kan sende inn spørsmål eller tilbakemeldinger via et kontaktskjema som lagres i databasen.
- **Responsiv design**: Nettstedet er responsivt og fungerer på både desktop og mobile enheter.
```

## Teknologier
```bash
- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS (for stil), JavaScript (for dynamisk funksjonalitet)
- **Database**: MySQL
- **Webserver**: Flask server
- **Frontend Design**: Enkelt og moderne design med fokus på brukeropplevelse.
```

## Komme i gang
```bash
Følg trinnene nedenfor for å sette opp applikasjonen på din lokale maskin.
```

### Forutsetninger
```bash
- Python 3.x
- MySQL server
- En nettleser som støtter HTML5 og CSS3
```

### Installer Python og Flask
```bash
1. Sjekk Python-versjonen din:
   python3 --version
```

### Opprett og aktiver et virtuelt miljø:
```bash

pip install flask mysql-connector-python
Sett opp MySQL-databasen
Start MySQL-serveren:
sudo systemctl start mysql  # Linux
Logg inn på MySQL:

mysql -u root -p
Opprett en database for applikasjonen:

sql
Kopier kode
CREATE DATABASE restaurant_db;
Kjøre Flask-serveren
Sørg for at Flask-applikasjonen er satt opp og konfigurert for å koble til MySQL-databasen (ingen Python-kode er inkludert i denne filen).
```

### Når alt er satt opp, kjør Flask-serveren:
```bash
python app.py
Åpne nettleseren din og naviger til http://127.0.0.1:5000/ for å bruke applikasjonen.
```


### Funksjoner
```bash
Reservasjon
Brukeren kan velge dato og tidspunkt for reservasjonen, samt spesifisere antall personer. Datoen kan ikke være tidligere enn dagens dato, og tidspunktet er tilgjengelig i intervaller på 15 minutter.

Takeaway
Brukeren kan velge en rett fra menyen og sende bestillingen direkte til restauranten. Systemet lagrer bestillinger i databasen og bekrefter bestillingen via en respons.

Kontakt oss
Brukeren kan fylle ut et skjema med navn, e-post, telefonnummer og en melding. Dataene sendes til databasen for videre behandling.
```


# Feilsøking
```bash
Flask-serveren starter ikke:

Sjekk at du har installert alle nødvendige avhengigheter via:

pip install -r requirements.txt
Sørg for at MySQL-serveren er i gang og at du har riktig konfigurert tilkoblingen i applikasjonen.
```


# Databasefeil:
```bash
Sørg for at tabellene er korrekt opprettet i MySQL.
Sjekk at du bruker riktig databasebruker og passord i applikasjonen.
Feil i brukergrensesnittet:

Hvis det er problemer med at tidspunktene for reservasjon ikke vises eller skjemaene ikke sendes inn riktig, sjekk JavaScript-koden som håndterer skjemaet og tidspunktene.
```

# Kontakt
```bash
Hvis du har spørsmål eller ønsker å bidra, kontakt oss på tiki-17@hotmail.com
```
   
