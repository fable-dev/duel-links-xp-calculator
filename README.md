# Yu-Gi-Oh! Duel Links Level Up XP Calculator

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success)
![Version](https://img.shields.io/badge/version-1.0.0-gold)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Stars](https://img.shields.io/github/stars/fable-dev/duel-links-xp-calculator?style=flat)

A web-based calculator designed to help Yu-Gi-Oh! Duel Links players optimize their level progression, calculate duel requirements, plan Vagrant or Bonus Duelist purchases, and manage resources efficiently.

---

## 📑 Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Quick Start Guide](#quick-start-guide)
- [Calculation Methods](#calculation-methods)
- [For Developers](#for-developers)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [Browser Support](#browser-support)
- [Support This Project](#support-this-project)
- [License](#license)
- [Legal Disclaimer](#legal-disclaimer)

---

## 🌐 Live Demo
➡️ **https://fable-dev.github.io/duel-links-xp-calculator/**

---

## ✨ Features
- ⚡ **Level Progression Calculator**: Calculate exact experience and number duels needed between any two levels
- 🔄 **Multiple Calculation Modes**:
  - Standard Duel Calculations
  - Vagrant Purchase Optimizer
  - Bonus Duelist Calculator
- 🎯 **Event Support**: 1.5x XP events and Gate Event Tokens
- 📊 **Rewards Multiplier**: Support for 1x-5x duel rewards
- 🧩 **Real-time Validation**: Prevents invalid inputs and provides helpful feedback
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- ⚙️ **One-Click Calculations**: Results appear instantly when you click Calculate or press Enter

---

## 🎮 Quick Start Guide

### Basic Level Calculation
1. **Enter Levels**: Set your Current Level (1-44) and Target Level (2-45)
2. **Current XP**: Optionally input your XP progress towards next level (auto-validated)
3. **Set Multiplier**: Choose your duel rewards multiplier (1x-5x)
4. **Toggle Events**: Enable 1.5x XP Event or Gate Event Tokens if active
5. **Calculate**: Click the Calculate button or press Enter to see results

### 🧙 Vagrant Mode
- Toggle "Only Purchasable Vagrants" switch
- Hides duel multiplier and event options (not applicable)
- Shows total purchases, cost, and leftover XP
- **Note**: Daily reset limitations apply in-game

### ⚔️ Bonus Duelist Mode
- Toggle "Only Purchasable Bonus Duelist" switch
- Hides duel multiplier and event options (not applicable)
- Calculates purchases needed and total cost
- Shows XP efficiency and recommendations
  
---

## 📊 Calculation Methods

### Standard Duels
- **Win**: 500 XP × multiplier
- **Loss**: 250 XP × multiplier
- **Event Bonus**: 1.5× multiplier when enabled
- **Token Calculation**: 5 tokens per multiplier when event enabled

### Vagrant Purchases
- **Tiered System**: ★ (31K XP) → ★★ (46K XP) → ★★★ (63.5K XP)
- **Purchase Sequence**: 2×★ → 2×★★ → ★★★ (repeats)
- **Daily Reset**: Limited purchases per day (game mechanic)
- **Each Purchase**: Provides 6 Vagrants (in-game mechanic)

### Bonus Duelists
- **Cost**: $1.99 per purchase (15,000 XP)
- **Content**: 30 duels per purchase
- **Limitation**: Only spawns Standard Duelists

---

## 🛠 For Developers

### Dependencies
- **Font Awesome**: Icons loaded from CDN (see index.html)
- **No build process, npm, or server required**

### Local Development

```bash
# Clone the repository
git clone https://github.com/fable-dev/duel-links-xp-calculator.git

# Navigate to folder
cd duel-links-xp-calculator

# Open in browser
open index.html
```

---

## 🔧 Customization Guide

### Update XP Table (`data.js`)
```javascript
const expTable = {
  1: 0,
  2: 500,
  // ... modify values as needed
};
```

### Modify Vagrant Data (`data.js`)
```javascript
const vagrantData = [
  { xp: 31000, cost: 1.99, description: "2×5K, 1×3.5K, 1×5K, 1×7.5K, 1×10K" },
  { xp: 46000, cost: 1.99, description: "1×3.5K, 2×5K, 1×7.5K, 1×10K, 1×15K" },
  { xp: 63500, cost: 1.99, description: "1×5K, 1×7.5K, 2×10K, 2×15K" },
];
```

### Update Styling (`style.css`)
```css
:root {
  --primary: #ffd700;
  --secondary: #8b0000;
  --background: #0a0a0a;
}
```

---

## 📂 Project Structure

```
duel-links-xp-calculator/
├── index.html        # Main UI
├── style.css         # Styling and responsive design
├── data.js           # XP tables and Vagrant values
├── logic.js          # Core calculations and handlers
└── README.md         # Documentation
```

---

## 📚 Usage Examples

### Example 1: Efficient Leveling
- Setup: Level 25 → Level 30 | 3× multiplier | XP Event ON
- Result: ~28 wins, 420 Gate Tokens (if event active)
- Note: Automatically accounts for 1.5× XP boost

### Example 2: Vagrant Strategy
- Setup: Level 35 → Level 40 | Vagrant Mode ON
- Result: 3 purchases ($5.97) → 140,500 XP (9,500 XP short!)
- Note: Need 4th purchase ($7.96 total) for 171,500 XP (21,500 leftover)

### Example 3: Resource Planning
- Setup: Level 10 (800/1800 XP) → Level 15 | 2× multiplier
- Result: Accurate duel count accounting for current progress
- Note: Input current XP to avoid overestimation

---

## 🤝 Contributing

Contributions make the community better! Here's how you can help:
### How to Help
- 🐛 Bug Reports: Describe the issue and steps to reproduce
- 💡 Feature Requests: Suggest new calculations or improvements
- 🔄 Data Updates: Report changes to game XP values
- ✨ UI/UX Improvements: Mobile enhancements welcome

### Development Workflow
1. Fork the repository
2. Create a feature branch (git checkout -b feature/improvement)
3. Commit your changes (git commit -m 'Add new feature')
4. Push to the branch (git push origin feature/improvement)
5. Open a Pull Request

### Areas for Contribution
- Additional game mode calculations
- New character-specific data
- Translation support  
- UI/UX improvements
- Mobile-quality improvements  

---

## 🌐 Browser Support
- Chrome 60+  
- Firefox 55+  
- Safari 12+  
- Edge 79+  
- iOS Safari / Chrome Mobile  

---

## 🌟 Support This Project 🌟
If this calculator saved you time and helped your Duel Links journey:
- ⭐ **Star the repository** to show your support
- 📨 **Share with friends** in the Duel Links community
- 🐛 **Report issues** to help improve the tool
- 💡 **Suggest Improvements**

---

## 📜 License
This project is licensed under the MIT License

---

## ⚖️ Legal Disclaimer
This project is not affiliated with, endorsed, sponsored, or specifically approved by Konami Digital Entertainment Co., Ltd. Yu-Gi-Oh! Duel Links is a registered trademark of Konami Digital Entertainment Co., Ltd.

This is a fan-made tool created for educational and convenience purposes. All game data is based on publicly available information and may change with game updates.

---

**Happy Dueling!** ⚡

May your draws be lucky and your level-ups fast!

---
*Last updated: November 2025 | Fan-made tool for Duel Links*
