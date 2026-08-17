# 🧬 GAT-B Guide: AI Admission Advisor

<div align="center">
  <img src="https://img.shields.io/badge/Gemini%202.5%20Flash-Powered-blue?style=for-the-badge&logo=google" alt="Gemini Powered" />
  <img src="https://img.shields.io/badge/Next.js%2015-App%20Router-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/Vercel-AI%20SDK-black?style=for-the-badge&logo=vercel" alt="Vercel AI SDK" />
  <img src="https://img.shields.io/badge/RAG-Architecture-orange?style=for-the-badge" alt="RAG Architecture" />
</div>

<br/>

**An AI-powered mentor for biotechnology aspirants, using historical cutoff data and personalized reasoning to guide institute selection.**

> 🔗 **Live Demo**: [https://gatbguide.vercel.app/](https://gatbguide.vercel.app/)  

---

## 💡 The Problem
Every year, thousands of students qualify for the **DBT GAT-B (Graduate Aptitude Test - Biotechnology)** exam in India. However, unlike engineering or medical entrance exams, GAT-B lacks a centralized counseling portal. 

Students are left to manually scour 80+ scattered university brochures, outdated forum posts, and confusing cutoff PDFs to figure out:
- *"Is my score safe for JNU?"*
- *"Which institutes offer an Integrated MS-PhD in North India?"*
- *"What is the difference between MSc and MTech Biotechnology?"*

This scattered information causes immense anxiety and leads to missed opportunities.

## 🚀 The Solution
**GAT-B Guide** solves this by combining **curated historical data** with the **reasoning power of Google Gemini 2.5 Flash**. 

We built a custom Retrieval-Augmented Generation (RAG) agent that acts as a personalized, expert admission counselor. Instead of just showing raw data, the AI *understands* the student's profile, retrieves verified knowledge, executes tools to calculate cutoffs, and provides tailored, strategic advice.

## ✨ Key Features & Agentic Capabilities

Built heavily on the concepts of modern agentic workflows:

1. **🛠️ Deterministic Tool Calling**
   - The Gemini agent is equipped with server-side tools (`getInstitutes`, `getCutoffs`). When a user asks about their score, the AI autonomously fetches real, calculated matching probabilities (High Match / Ambitious / Safe) directly from our custom recommendation engine. **Zero hallucination of data.**

2. **🧠 Custom RAG Engine (Knowledge Retrieval)**
   - We implemented a lightweight, dependency-free TF-IDF text retrieval system. 
   - A verified Markdown Knowledge Base (`/knowledge`) contains detailed institute research profiles, FAQs, and admission rules. The system intercepts the user's prompt, retrieves the top 3 most relevant knowledge chunks, and injects them dynamically into Gemini's context window.

3. **💬 Contextual Memory & Multi-Step Reasoning**
   - The agent remembers the user's score, category, and preferences across the session. You can follow up with *"Exclude interview-based colleges"* or *"Compare JNU and IIT Indore"* and the AI will reason over the exact data margins to explain *why* one is a safer choice than the other.

4. **📊 Extensive Curated Dataset**
   - 83+ DBT-funded institutes, over 3 years of historical cutoffs, normalized program details, and meticulously curated seat matrices.

## 🛠️ Tech Stack

- **AI Model**: Google Gemini 2.5 Flash
- **AI Framework**: Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4, shadcn/ui
- **Backend/Deployment**: Node.js, Vercel Serverless Functions
- **Data Parsing**: PapaParse (local filesystem parsing for ultra-fast Serverless execution)

## 🏗️ Architecture Flow

1. **User Input** ➔ Student enters *"I scored 175 in UR. Suggest colleges focusing on Genetics, North India only."*
2. **RAG Retrieval** ➔ `RetrievalService` scans the Knowledge Base and pulls data on Genetics programs and North Indian institutes.
3. **Tool Execution** ➔ Gemini triggers `generateRecommendations(175, "UR")`. Our deterministic engine calculates weighted historical margins.
4. **Reasoning Synthesis** ➔ Gemini combines the mathematical tool output with the retrieved textual knowledge to generate a human-like, strategic counseling response.

## 💻 Running Locally

### Prerequisites
- Node.js v18.17+
- A Google Gemini API Key

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/okbiswa/gatb-guide.git
   cd gatb-guide
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```text
├── knowledge/               # RAG Markdown Knowledge Base (FAQs, Institutes, etc.)
├── public/data/             # Curated CSV datasets (Cutoffs, Seat Matrices)
├── src/
│   ├── app/                 # Next.js App Router (Pages & AI API Route)
│   ├── components/          # UI Components & AdmissionAdvisor Chat Interface
│   ├── lib/                 # Core Logic: RAG Retrieval, Knowledge Service, CSV Parser
│   └── utils/               # AI Tool Definitions
```

## 🤝 Contribution & License
Data curation by Biswarup Nandi (M.Sc. Biotechnology, JNU).
Feel free to open issues or PRs if you find missing admission data or want to improve the AI logic.

This project is licensed under the MIT License.
