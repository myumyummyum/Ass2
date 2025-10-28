THIS PROJECT WILL C  H A N G E  Y  O U R L I F E

# Ass2 DataAnal
## weather checker; do i need an umbrella?
(too much code for nothing)

This project uses a **fetch request** to Open-Meteo to check wether it will rain druing ttwo fixed time frames, "morning" and "evening" for a specific location.

1. Pulls hourly weather data from Open-Meteo.
2. Filters the data for today using set latitude and longitude values.
3. Checks two fixed time windows.
4. Determines if any hour within those windows includes rain.
5. Prints a simple result in the console: **"Rain"** or **"No rain"** along with basic weather data.

### How to Run
1. Open `index.html` in any modern web browser.
2. Open **Developer Tools → Console**.
3. The console will display the weather data and the umbrella decision.

### Example output
Morning rain? false
Evening rain? true
UMBRELLA DECISION: { date: '2025-10-30', label: 'Rain', needUmbrella: true }
