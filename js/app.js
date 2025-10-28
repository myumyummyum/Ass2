// My house (MAYBE)
Latitude: 59.3489
Longitude: 18.0576

// TIME CONSTANS
const MORNING = { start: "07:00", end: "09:00" };
const EVENING = { start: "16:00", end: "18:00" };

// WEATHER CODES THAT MEAN RAIN, PROVIDED BY OPEN METEO https://open-meteo.com/en/docs?hourly=weather_code
const RAIN_CODES = new Set([
  51,53,55,        // drizzle
  61,63,65,        // rain
  66,67,           // freezing rain
  71,73,75,        // snow
  80,81,82,        // rain showers
  85,86,           // snow showers
  95,96,99         // thunderstorm variants
]); //fetched by chatgpt tbh, imagine if i read that 500 page document lol

// is there rain in H hour?
const isRainy = h =>
  (h.precip_mm > 0.1) || (h.pop >= 50) || RAIN_CODES.has(h.code);

//is h hour within the constrain parameters? "MORNING" & "EVENING" yo
function inWindow(localISO, startHHMM, endHHMM) {
  const d = new Date(localISO);
  const [sh, sm] = startHHMM.split(":").map(Number);
  const [eh, em] = endHHMM.split(":").map(Number);
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), sh, sm);
  const end   = new Date(d.getFullYear(), d.getMonth(), d.getDate(), eh, em);
  return d >= start && d < end;
}




