// My house (MAYBE)
const LAT = 59.3489;
const LON = 18.0576;


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
//the thing - the api thing.
async function main() {const url =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  `&hourly=weathercode,precipitation,precipitation_probability&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const data = await res.json();
//filter data for hour
  const H = data.hourly;
  const rows = H.time.map((t, i) => ({
    time: t,
    code: H.weathercode[i],
    precip_mm: H.precipitation[i],
    pop: H.precipitation_probability[i]
  }));
  //filter for today
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const todayRows = rows.filter(r => r.time.startsWith(today));

  //filter for time window
  const morningHours = todayRows.filter(r => inWindow(r.time, MORNING.start, MORNING.end));
  const eveningHours = todayRows.filter(r => inWindow(r.time, EVENING.start, EVENING.end));

  //chech if some of the results fall within the paramaterteresres IF RAIN :(
  const morningRain = morningHours.some(isRainy);
  const eveningRain = eveningHours.some(isRainy);

  //RAIN? NO RAIN?
  const needUmbrella = morningRain || eveningRain;
  const label = needUmbrella ? "Rain" : "No rain";

  console.log("Morning hours:", morningHours);
  console.log("Evening hours:", eveningHours);
  console.log("Morning rain?", morningRain);
  console.log("Evening rain?", eveningRain);
  console.log("UMBRELLA DECISION:", { date: today, label, needUmbrella });
  console.log(`\n🌦️  Do I need an umbrella today? → ${needUmbrella ? "YES" : "NO"}\n`);

}

main().catch(err => console.error("Error:", err));
