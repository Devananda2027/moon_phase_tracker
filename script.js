const moonContainer = document.getElementById("moon-container");
const toggleBtn = document.getElementById("toggle-btn");

let showingNext7 = false;

// Moon phase data (icons + labels + fun facts)
const moonPhases = [
  { icon: "🌑", label: "New Moon", fact: "The Moon is between Earth and Sun, hidden from view." },
  { icon: "🌒", label: "Waxing Crescent", fact: "A sliver of the Moon starts to shine after the New Moon." },
  { icon: "🌓", label: "First Quarter", fact: "Half the Moon is illuminated, a great time for stargazing." },
  { icon: "🌔", label: "Waxing Gibbous", fact: "The Moon grows brighter each night before Full Moon." },
  { icon: "🌕", label: "Full Moon", fact: "The Moon is fully illuminated — ancient calendars followed it." },
  { icon: "🌖", label: "Waning Gibbous", fact: "Light starts shrinking after the Full Moon." },
  { icon: "🌗", label: "Last Quarter", fact: "Half Moon again, but the opposite side is lit compared to First Quarter." },
  { icon: "🌘", label: "Waning Crescent", fact: "A thin slice remains before returning to New Moon." },
];

// Calculate moon data for a given date
function getMoonData(date) {
  const knownNewMoon = new Date("2025-01-29T00:00:00"); // reference new moon
  const synodicMonth = 29.53; // lunar cycle in days

  const daysSinceNew = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
  const moonAge = daysSinceNew % synodicMonth;
  const illumination = Math.round((1 - Math.cos((2 * Math.PI * moonAge) / synodicMonth)) * 50) * 2;

  let phaseIndex = Math.floor((moonAge / synodicMonth) * 8) % 8;
  return {
    icon: moonPhases[phaseIndex].icon,
    label: moonPhases[phaseIndex].label,
    fact: moonPhases[phaseIndex].fact,
    age: moonAge.toFixed(1),
    illumination: illumination
  };
}

// Render cards
function renderMoonCards(daysAhead = 0) {
  moonContainer.innerHTML = "";
  for (let i = 0; i <= daysAhead; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const data = getMoonData(date);

    const card = document.createElement("div");
    card.className = "moon-card";
    card.innerHTML = `
      <div class="moon-icon">${data.icon}</div>
      <h2>${data.label}</h2>
      <p><strong>Date:</strong> ${date.toDateString()}</p>
      <p><strong>Moon Age:</strong> ${data.age} days</p>
      <p><strong>Illumination:</strong> ${data.illumination}%</p>
      <p class="fact">✨ ${data.fact}</p>
    `;
    moonContainer.appendChild(card);
  }
}

// Toggle button
toggleBtn.addEventListener("click", () => {
  showingNext7 = !showingNext7;
  if (showingNext7) {
    renderMoonCards(7);
    toggleBtn.textContent = "🌍 Show Today Only";
  } else {
    renderMoonCards(0);
    toggleBtn.textContent = "🔮 Show Next 7 Days";
  }
});

// Initial load
renderMoonCards(0);
