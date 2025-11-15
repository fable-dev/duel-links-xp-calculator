//Calculate XP difference between levels
const levelDifferences = {};
for (let level = 1; level <= 44; level++) {
  levelDifferences[level] = expTable[level + 1] - expTable[level];
}

function validateXPInput() {
  const currentLevel = parseInt(document.getElementById("currentLevel").value);
  const currentXP = parseInt(document.getElementById("currentXP").value || 0);

  if (currentLevel >= 45) {
    document.getElementById("currentXP").setAttribute("disabled", "true");
    document.getElementById("currentXP").value = 0;
    return true;
  }

  const maxXP = levelDifferences[currentLevel];
  document.getElementById("currentXP").max = maxXP;

  if (currentXP > maxXP) {
    alert(`Error! The maximum XP needed to reach level ${
      currentLevel + 1
    } from level ${currentLevel} is ${maxXP}. 
You entered ${currentXP}. 
Please either:
- Reduce your Current XP to ${maxXP} or below, OR
- Increase your Current Level if you have enough XP to reach the next level`);
    document.getElementById("currentXP").value = maxXP;
    return false;
  }
  return true;
}

function calculateCurrentXP() {
  const currentLevel = parseInt(document.getElementById("currentLevel").value);
  const currentXP = parseInt(document.getElementById("currentXP").value || 0);

  if (!validateXPInput()) return null;
  return expTable[currentLevel] + currentXP;
}

function calculateXP(level) {
  const integerPart = Math.floor(level);
  const decimalPart = level - integerPart;

  if (
    integerPart < 1 ||
    integerPart > 45 ||
    decimalPart < 0 ||
    decimalPart >= 1
  ) {
    return null;
  }

  const baseXP = expTable[integerPart];
  if (integerPart === 45) return baseXP; // Max level

  const nextLevelXP = expTable[integerPart + 1];
  return baseXP + (nextLevelXP - baseXP) * decimalPart;
}

function updateDuelTierOptions() {
  const duelTier = document.getElementById("duelTier");
  const eventTokensActive = document.getElementById("eventTokens").checked;

  duelTier.innerHTML = ""; // Clear existing options

  const maxMultiplier = eventTokensActive ? 3 : 5;
  for (let i = 1; i <= maxMultiplier; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i + "x";
    duelTier.appendChild(option);
  }
}

//Adding event listener for 'Enter' key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateDuels();
  }
});

//Adding listener for event token toggle
document
  .getElementById("eventTokens")
  .addEventListener("change", updateDuelTierOptions);

// Adding event listeners for level and XP inputs
document.getElementById("currentLevel").addEventListener("change", function () {
  validateXPInput();
  calculateDuels();
});
document.getElementById("currentXP").addEventListener("input", function () {
  validateXPInput();
  calculateDuels();
});

//Adding Vagrant listeners
document
  .getElementById("vagrantToggle")
  .addEventListener("change", function () {
    const vagrantActive = this.checked;
    document
      .getElementById("duelTier")
      .parentElement.classList.toggle("hidden", vagrantActive);
    document
      .getElementById("xpEvent")
      .parentElement.classList.toggle("hidden", vagrantActive);
    document
      .getElementById("eventTokens")
      .parentElement.classList.toggle("hidden", vagrantActive);
    document.getElementById("bonusDuelistToggle").checked = false;
  });

//Adding Bonus Duelist listeners
document
  .getElementById("bonusDuelistToggle")
  .addEventListener("change", function () {
    const bonusDuelistActive = this.checked;
    document
      .getElementById("duelTier")
      .parentElement.classList.toggle("hidden", bonusDuelistActive);
    document
      .getElementById("xpEvent")
      .parentElement.classList.toggle("hidden", bonusDuelistActive);
    document
      .getElementById("eventTokens")
      .parentElement.classList.toggle("hidden", bonusDuelistActive);
    document.getElementById("vagrantToggle").checked = false;
  });

function calculateDuels() {
  const vagrantActive = document.getElementById("vagrantToggle").checked;
  const bonusActive = document.getElementById("bonusDuelistToggle").checked;

  if (vagrantActive) {
    calculateVagrants();
    return;
  }

  if (bonusActive) {
    calculateBonusDuelist();
    return;
  }

  const currentLevel = parseInt(document.getElementById("currentLevel").value);
  const targetLevel = parseInt(document.getElementById("targetLevel").value);
  const duelMultiplier = parseInt(document.getElementById("duelTier").value);
  const xpEventActive = document.getElementById("xpEvent").checked;
  const eventTokensActive = document.getElementById("eventTokens").checked;

  // Validate levels
  if (currentLevel >= targetLevel) {
    alert("Target level must be higher than current level!");
    return;
  }

  // Calculate current XP
  const currentExp = calculateCurrentXP();
  const targetExp = expTable[targetLevel];

  if (currentExp === null || targetExp === null) {
    alert("Invalid level selection!\n• Levels must be between 1-45");
    return;
  }

  if (currentLevel < 1 || currentLevel > 44) {
    alert("Invalid level selection!\n• Current Level must be between 1-44");
    return;
  }

  if (targetLevel < 2 || targetLevel > 45) {
    alert("Invalid level selection!\n• Target Level must be between 2-45");
    return;
  }

  if (eventTokensActive && duelMultiplier > 3) {
    alert("Event Tokens mode maximum multiplier is 3x!");
    return;
  }

  const xpNeeded = Math.ceil(targetExp - currentExp);
  const xpMultiplier = xpEventActive ? 1.5 : 1;

  // Base values
  const baseXPWin = 500 * duelMultiplier * xpMultiplier;
  const baseXPLoss = 250 * duelMultiplier * xpMultiplier;

  // Calculate duels required
  const duelsWin = Math.ceil(xpNeeded / baseXPWin);
  const duelsLoss = Math.ceil(xpNeeded / baseXPLoss);

  // Calculate tokens if enabled (5 × multiplier per duel)
  const tokensPerDuel = 5 * duelMultiplier;
  const tokensWin = eventTokensActive ? duelsWin * tokensPerDuel : 0;
  const tokensLoss = eventTokensActive ? duelsLoss * tokensPerDuel : 0;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
                <strong>Calculation Results</strong>
                <div>
                    <span>Current Level XP:</span>
                    <span class="highlight">${currentExp.toLocaleString()}</span>
                </div>
                <div>
                    <span>Target Level XP:</span>
                    <span class="highlight">${targetExp.toLocaleString()}</span>
                </div>
                <div>
                    <span>Total XP Needed:</span>
                    <span class="highlight">${xpNeeded.toLocaleString()}</span>
                </div>                

                <div class="summary-row">
                    <span>Best Case (All Wins):</span>
                    <div class="scenario-details">
                        
                        <span>Duels: ${duelsWin.toLocaleString()}</span>
                        ${
                          eventTokensActive
                            ? `<span>Total Tokens: ${tokensWin.toLocaleString()}</span>`
                            : ""
                        }<span>XP/Duel: ${Math.round(
    baseXPWin
  ).toLocaleString()} ${xpEventActive ? "⚡" : ""}</span>
                        ${
                          eventTokensActive
                            ? `<span>Tokens/Duel: ${tokensPerDuel.toLocaleString()}</span>`
                            : ""
                        }
                    </div>
                </div>
            
                <div class="summary-row">
                    <span>Worst Case (All Losses):</span>
                    <div class="scenario-details">
                        
                        <span>Duels: ${duelsLoss.toLocaleString()}</span>
                        ${
                          eventTokensActive
                            ? `<span>Total Tokens: ${tokensLoss.toLocaleString()}</span>`
                            : ""
                        }
                        <span>XP/Duel: ${Math.round(
                          baseXPLoss
                        ).toLocaleString()} ${xpEventActive ? "⚡" : ""}</span>
                        ${
                          eventTokensActive
                            ? `<span>Tokens/Duel: ${tokensPerDuel.toLocaleString()}</span>`
                            : ""
                        }
                    </div>
                </div>
            `;
}
function calculateVagrants() {
  const currentLevel = parseInt(document.getElementById("currentLevel").value);
  const targetLevel = parseInt(document.getElementById("targetLevel").value);
  const currentExp = calculateCurrentXP();
  const targetExp = expTable[targetLevel];

  if (currentLevel >= targetLevel) {
    alert("Target level must be higher than current level!");
    return;
  }

  const xpNeeded = targetExp - currentExp;
  let vagrantXP = 0;
  let remainingXP = xpNeeded;
  let purchases = [];
  let totalCost = 0;

  // Calculate purchases
  while (remainingXP > 0) {
    let tier;
    if (purchases.filter((p) => p.tier === 0).length < 2) {
      tier = 0;
    } else if (purchases.filter((p) => p.tier === 1).length < 2) {
      tier = 1;
    } else {
      tier = 2;
    }

    const purchase = vagrantData[tier];
    purchases.push({ ...purchase, tier });
    remainingXP -= purchase.xp;
    vagrantXP += purchase.xp;
    totalCost += purchase.cost;

    // Prevent infinite loop
    if (purchases.length > 100) break;
  }

  let leftoverXP = vagrantXP - xpNeeded;
  if (leftoverXP <= 0) {
    leftoverXP = 0;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
        <strong>Calculation Results</strong>
                <div>
                    <span>Total XP Needed:</span>
                    <span class="highlight">${xpNeeded.toLocaleString()}</span>
                </div>
                <div>
                    <span>Total Vagrant Purchases (Same Game Day):</span>
                    <span class="highlight">${purchases.length}</span>
                </div>
                <div>
                    <span>XP Provided by Vagrants:</span>
                    <span class="highlight">${vagrantXP.toLocaleString()}</span>
                </div>
                <div>
                    <span>Excess/Leftover XP:</span>
                    <span class="highlight">${leftoverXP.toLocaleString()}</span>
                </div>
                <div class="summary-row">
                    <span>Total Cost:</span>
                    <span class="highlight">$${totalCost.toFixed(2)}</span>
                </div>
                <div>
                <strong>Important Notes:</strong>
                    <ul>
                        <li>Each purchase provides 6 Vagrants</li>
                        <li>Purchases must be made in sequence (2 x ★ → 2 x ★★ → ★★★)</li>
                        <li>Resets Daily</li>
                        <li>Vagrants remain until defeated</li>
                    </ul>
                </div>
    `;
}

function calculateBonusDuelist() {
  const currentLevel = parseInt(document.getElementById("currentLevel").value);
  const targetLevel = parseInt(document.getElementById("targetLevel").value);
  const currentExp = calculateCurrentXP();
  const targetExp = expTable[targetLevel];

  if (currentLevel >= targetLevel) {
    alert("Target level must be higher than current level!");
    return;
  }

  const xpNeeded = targetExp - currentExp;
  const xpPerPurchase = 15000;
  const purchases = Math.ceil(xpNeeded / xpPerPurchase);
  const totalCost = purchases * 1.99;
  const bonusDuelistXP = purchases * xpPerPurchase;
  let leftoverXP = bonusDuelistXP - xpNeeded;
  if (leftoverXP <= 0) {
    leftoverXP = 0;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
        <strong>Calculation Results</strong>
                <div>
                    <span>Total XP Needed:</span>
                    <span class="highlight">${xpNeeded.toLocaleString()}</span>
                </div>
                <div>
                    <span>Total Purchases:</span>
                    <span class="highlight">${purchases}</span>
                </div>
                <div>
                    <span>XP Provided by Bonus Duelists:</span>
                    <span class="highlight">${bonusDuelistXP.toLocaleString()}</span>
                </div>
                <div>
                    <span>Excess/Leftover XP:</span>
                    <span class="highlight">${leftoverXP.toLocaleString()}</span>
                </div>
                <div class="summary-row">
                    <span>Total Cost:</span>
                    <span class="highlight">$${totalCost.toFixed(2)}</span>
                </div>
                <div>
                <strong>Important Notes:</strong>
                <ul>
                    <li>Each purchase provides 30 duels (15,000 total XP)</li>
                    <li>Costs $1.99 per purchase</li>
                    <li>Only spawns Standard Duelists</li>
                    <li>Not recommended for pure XP farming</li>
                    <li>Does not stack with other boosts</li>
                </ul>
            </div>

    `;
}
