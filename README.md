# ClariFi

**ClariFi** is an AI-powered clarity assistant that helps users turn confusion into actionable insights. Describe your situation, select a context, and get a concise report with reality, key variables, and suggested next steps.

---

## 🚀 Features

- **Contextual Analysis:** Career, Study, Personal, or Project.
- **AI-Powered Insights:** Uses Cohere Chat API to generate actionable guidance.
- **Clean & Interactive UI:** Built with React, TypeScript, and Tailwind CSS.
- **Copy & Reset:** Easily copy reports and analyze multiple situations.
- **Responsive Design:** Works seamlessly on desktop and mobile.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express
- **AI Integration:** Cohere Chat API
- **Other:** CORS, dotenv

---

## ⚡ Getting Started

### Prerequisites

- Node.js v18+
- Cohere API Key

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd ClariFi
Install dependencies:

bash
Copy code
# Backend
cd BackEnd
npm install

# Frontend
cd ../FrontEnd
npm install
Create a .env file in BackEnd:

env
Copy code
COHERE_API_KEY=your_api_key_here
Run Backend & Frontend:

bash
Copy code
# Backend
cd BackEnd
node server.js

# Frontend
cd ../FrontEnd
npm run dev
```
🖼️ Usage
Open the app in the browser.

Describe your situation in the text area.

Select a context: Career, Study, Personal, Project.

Click Get Clarity.

Copy your report or reset for another analysis.

📦 Sample Output
json
Copy code
```
{
  "reality": "You are overthinking your career path because of limited clarity on priorities.",
  "variables": ["Current skills", "Available opportunities", "Personal interests"],
  "nextStep": "Focus on one skill to improve, research opportunities, and make a small actionable plan."
}
```
🔗 Links
Cohere Chat API Docs: https://docs.cohere.com


👨‍💻 Author
Devindi Chathurika

