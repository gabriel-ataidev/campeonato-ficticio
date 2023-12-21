const matches = document.querySelector("#matches");
const roundCounter = document.querySelector("#roundCounter");

let data = [];
let currentRound = 1;

async function fetchData() {
  try {
    const response = await fetch("https://sevn-pleno-esportes.deno.dev/data");

    if (!response?.ok) {
        console.error("Erro na requisição:" + response, error);
    }

    data = await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

const getPhoto = (team) => {
  const lastLetter = team.charAt(team.length - 1);
  return `assets/team_shield_${lastLetter}.png`;
};

const fillCards = (round) => {
  for (const item of data[round - 1].games) {
    const match = `
                <div class="match">
                    <div class="team">
                        <img src=${getPhoto(
                          item.team_home_id
                        )} alt="escudo do time mandante">
                        <span>${item.team_home_name}</span>
                    </div>
                    <div class="match_result">
                        <span class="value">${item.team_home_score}</span>
                        <img src="./assets//Group 3.svg" alt="x">
                        <span class="value">${item.team_away_score}</span>
                    </div>
                    <div class="team team-away">
                        <span>${item.team_away_name}</span>
                        <img src=${getPhoto(
                          item.team_away_id
                        )} alt="escudo do time visitante">
                    </div>
                </div>`;
    matches.innerHTML += match;
  }
  roundCounter.innerHTML = `RODADA ${round}`;
};


(async function () {
  await fetchData();
  fillCards(currentRound);
})();
