# Website Knowledge

## What is GAT-B Guide?
GAT-B Guide is an AI-powered admission advisor for biotechnology aspirants. It uses historical cutoff data and personal reasoning to guide institute selection for students who qualify the DBT GAT-B exam.

## Pages and Usage

### 1. Home (/)
- **Purpose**: Landing page and main search interface.
- **Key Features**: Users enter their GAT-B score (numeric), category (UR/OBC/SC/ST/EWS), and desired degree (MSc/MTech/Int MS-PhD). They can also specify keywords like preferred state or special interest.
- **Featured Institutes**: A curated section highlighting top research institutes ranked by reputation.

### 2. Results (/results)
- **Purpose**: Displays ranked college recommendations based on the user's score and category.
- **Segmentation**: Colleges are segmented into "Top Matches" (where score > cutoff), "Ambitious Choices" (slightly below cutoff), and "Other Options".
- **Details**: Shows margin, city/state, seat matrix, admission links, and links to YouTube discussion videos.

### 3. Institute Details (/institute/[id])
- **Purpose**: Provides detailed information on each institute's biotechnology program.
- **Details**: Shows research specializations, labs/centers, list of offered programs, eligibility criteria, total seats, and YouTube guides.

### 4. Cutoff Trends (/cutoffs)
- **Purpose**: Allows users to browse and visualize historical cutoffs by institute, program, and category to analyze competitiveness.

### 5. Programs (/programs)
- **Purpose**: Explains the differences between program types (M.Sc., M.Tech., Int. MSc-PhD) and lists which institutes offer them.

### 6. Seat Matrix (/seats)
- **Purpose**: Displays the total seats per institute by reservation category (UR/OBC/SC/ST/EWS).

### 7. About (/about)
- **Purpose**: Describes project motivation, the creator, and how the data was gathered.

### 8. AI Advisor
- **Purpose**: A Gemini-powered AI agent integrated via secure API. Users can ask natural language questions like "I scored 163 in UR, prefer North India, no interviews."
- **Capabilities**: Explains reasoning, filters institutes, compares two colleges, and designs counseling strategies.
- **Constraint**: It uses strict database tool calling to avoid hallucinating admission data.

### 9. Dark Mode
- The website fully supports dark mode, optimizing the UI for nighttime reading.

## Tech Stack
Next.js 15, TypeScript, React, Tailwind CSS, shadcn/ui.
Google Gemini 2.5 Pro via AI Studio API.
Deployed on Vercel.

## Data Sources
- **DBT GAT-B Notifications**: Official PDFs from RCB.
- **Institute Websites**: Official pages (e.g. JNU SLS, UoH SLS, RGCB, RCB).
- **Academic Bulletins**: Published admission notices.
- **YouTube & Forums**: Verified discussions of previous cutoffs.
