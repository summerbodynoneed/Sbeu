const trophies = Array.from(document.querySelectorAll(".trophy-card"));
const totalElement = document.getElementById("total-km") || document.getElementById("km-counter");

function computeTotalKm(cards) {
  return cards.reduce((sum, trophy) => {
    const km = Number(trophy.dataset.km) || 0;
    const runners = String(trophy.dataset.runners || "")
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    return sum + km * runners.length;
  }, 0);
}

function displayTotal(totalKm) {
  if (!totalElement) {
    return;
  }
  totalElement.textContent = `${totalKm} KM`;
}

async function initTotalKm() {
  if (!totalElement) {
    return;
  }

  if (trophies.length > 0) {
    displayTotal(computeTotalKm(trophies));
    return;
  }

  try {
    const response = await fetch("trophy.html", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Unable to load trophy.html");
    }

    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const remoteTrophies = Array.from(doc.querySelectorAll(".trophy-card"));

    displayTotal(computeTotalKm(remoteTrophies));
  } catch (error) {
    console.error("Impossible de calculer le total des kilomètres :", error);
    displayTotal(0);
  }
}

initTotalKm();
