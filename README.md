# Jotform Frontend Challenge Project

## User Information


- **Name**: Erkim Berk Ünsal

## Project Description
**Missing Podo: The Ankara Case** is an Investigation Dashboard built for the 3-hour Jotform Frontend Challenge. 

The objective of this project is to track down Jotform's missing mascot, Podo, by consolidating scattered data from various API endpoints (Checkins, Messages, Sightings, Personal Notes, and Anonymous Tips). The application normalizes these disparate data structures and presents them in a unified, chronological flow. 

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
```bash
cd jotform-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment Setup:**
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Fill in the Jotform API credentials and Form IDs in `.env`

4. **Start the development server:**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
Jotform hackathon/
└── jotform-frontend/
   ├── .env.example
   ├── DATA_SCHEMA.md
   ├── package.json
   └── src/
      ├── App.jsx
      ├── main.jsx
      ├── components/
      │   ├── dashboard/
      │   │   ├── MetricCard.jsx
      │   │   ├── RecentEventsPanel.jsx
      │   │   └── SourceBreakdownCard.jsx
      │   ├── layout/
      │   │   ├── SidebarNav.jsx
      │   │   └── TopBar.jsx
      │   ├── people/
      │   │   ├── LinkedRecordsPanel.jsx
      │   │   └── PeopleListPanel.jsx
      │   ├── records/
      │   │   ├── RecordDetailPanel.jsx
      │   │   └── RecordListPanel.jsx
      │   └── timeline/
      │       └── EventTimelineList.jsx
      ├── config/
      │   └── routes.js
      ├── hooks/
      │   └── useFetchSubmissions.jsx
      ├── layouts/
      │   └── InvestigationLayout.jsx
      ├── pages/
      │   ├── DashboardPage.jsx
      │   ├── EventFlowPage.jsx
      │   ├── PeoplePage.jsx
      │   └── RecordsPage.jsx
      ├── services/
      │   ├── api.jsx
      │   ├── dataService.js
      │   └── investigationService.js
      └── theme/
         └── investigationTheme.js
```

   ## Further Improvements

   - Add map clustering and route lines for timeline events to better visualize movement patterns.
   - Add a scoring engine for suspicious activity based on urgency, confidence and frequency of mentions.
   - Add export options (CSV/PDF) for selected records and investigation summaries.
   - Add request caching and incremental updates to reduce repeated API calls.
   - Add role-based UI modes (analyst, reviewer) and audit-friendly activity logs.

   ## Hackathon Note

   I started this hackathon about 30 minutes late because I ran into a Node.js-related issue at the beginning; I was about to ask my mentor for help but it looked like a very simple problem and I did not realize how quickly the time passed. I was still able to complete the project.
