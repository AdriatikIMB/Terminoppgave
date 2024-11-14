# Restaurant Reservasjonssystem

Dette prosjektet er en enkel webapplikasjon for et Restaurant Reservasjonssystem, der brukere kan reservere bord, bestille takeaway og administrere reservasjoner på en enkel måte. Løsningen er laget uten en permanent database; i stedet håndteres dataen i en midlertidig "database" i minnet under sesjonen.

## Funksjonalitet

- **Reserver bord**: Brukere kan reservere bord ved å angi dato, tid og antall personer.
- **Bestill takeaway**: Brukere kan bestille mat som takeaway ved å velge fra menyen.
- **Vis reservasjoner**: Ansatte kan vise en liste over alle aktive reservasjoner i gjeldende sesjon.
- **Vis takeaway-bestillinger**: Ansatte kan se alle takeaway-bestillinger som er gjort i gjeldende sesjon.

## Teknologier som brukes

- **Python**: For backend-logikk og lagring av reservasjoner og bestillinger i en midlertidig "database" i minnet.
- **HTML, CSS og JavaScript**: For frontend-grensesnittet.

## Kjøring av applikasjonen

1. Kjør Python-filene for å starte serveren.
2. Åpne nettleseren og gå til `localhost`-adressen som serveren angir for å få tilgang til applikasjonen.
