# Kuchyně Online – Vícekrokový konfigurátor

Tento projekt je jednoduchý více-krokový formulář pro online konfiguraci kuchyně. Uživatel si postupně vybírá dispozici, spotřebiče, dekor, rozpočet a následně odešle své kontaktní údaje.

## Použité technologie

- **HTML**, **CSS** (včetně responzivního designu)
- **JavaScript** (čistý bez knihoven)
- **PHP** – proxy pro API

## Funkce

- 8 kroků konfigurace s přehlednou navigací
- Mobilní verze s upraveným zobrazením (zkrácené nadpisy, mobilní navigace)
- Shrnutí výběrů před odesláním
- Validace výběrů a deaktivace tlačítek do volby
- Proxy skript (`proxy.php`) pro bezpečné volání API bez CORS problémů

## Spuštění

1. Otevřete `index.html` v prohlížeči.
2. Pro správné odesílání je nutné spustit projekt na serveru s podporou PHP (např. XAMPP, MAMP).

## Požadavky

- Webový server s PHP
- Připojení k internetu

## Autor

Projekt byl vytvořen jako testovací úkol s důrazem na funkčnost, přehlednost a responzivitu.
