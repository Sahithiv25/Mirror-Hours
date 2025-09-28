Mirror Hours ⏰✨
<div align="center">
Find fair meeting times across time zones with empathy-driven scheduling

https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react
https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript

Stop the timezone guessing game. Start scheduling with empathy.


</div>
🌟 What Problem Does Mirror Hours Solve?
"We have team members in New York, Berlin, and Tokyo. Finding meeting times that don't make someone work at 3 AM is a weekly struggle."

Traditional scheduling tools show timezone conversions, but they don't solve the fundamental problem: finding overlapping times that respect everyone's work preferences and distribute inconvenience fairly.

🎯 The Mirror Hours Difference
Traditional Tools	Mirror Hours
❌ Static timezone conversion	✅ Dynamic, multi-day search
❌ Manual fairness tracking	✅ Automated empathy engine
❌ One-size-fits-all schedules	✅ Personalized work styles
❌ Basic table views	✅ Interactive heatmaps

🚀 Key Features
🧠 Intelligent Overlap Detection
⚖️ Fairness Engine
🎨 Visual Scheduling Dashboard
📅 Seamless Calendar Integration

🏗️ Architecture Overview

Frontend (React + TypeScript)
    ↓
Overlap Calculator (Multi-day search)
    ↓
Fairness Engine (Empathy scoring)
    ↓
Visualization Layer (Heatmap + Timeline)
    ↓
Calendar Integration (Google/Outlook/ICS)


Installation
bash
# Clone the repository
git clone https://github.com/your-username/mirror-hours.git

# Navigate to project directory
cd mirror-hours

# Install dependencies
npm install

# Start development server
npm start
The application will open at http://localhost:3000

Building for Production
bash
# Create production build
npm run build

# Serve the build locally
npm install -g serve
serve -s build

📖 Usage Guide
1. Setting Up Your Team
typescript
// Example team configuration
const teamMembers = [
  {
    name: "Alice",
    timezone: "America/New_York",
    workStyle: "standard", // 9AM-5PM
  },
  {
    name: "Bob", 
    timezone: "Europe/Berlin",
    workStyle: "early_bird", // 7AM-3PM
  },
  {
    name: "Charlie",
    timezone: "Asia/Tokyo", 
    workStyle: "flexible", // 6AM-8PM
    customHours: { start: 10, end: 18 } // Optional override
  }
];

👥 Who Uses Mirror Hours?
Industry	Use Case
Remote-first Companies	Coordinate distributed teams
Project Management	Cross-timezone project planning
Startups	International team coordination
Enterprise	Flexible work arrangement support
Freelancers	Global client scheduling


<div align="center">
Made with ❤️ for distributed teams everywhere
</div>
