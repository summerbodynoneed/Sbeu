const trophies = document.querySelectorAll(".trophy-card");
const totalElement = document.getElementById("total-km");

let totalKm = 0;

trophies.forEach((trophy) => {
  const km = Number(trophy.dataset.km) || 0;
  const runnersText = trophy.dataset.runners || "";

  const runners = runnersText
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");

  totalKm += km * runners.length;
});

if (totalElement) {
  totalElement.textContent = "TOTAL : " + totalKm + " KM";
}
