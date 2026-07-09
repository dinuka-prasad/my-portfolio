# GitHub Profile & Repository Setup Guide

A clean, structured GitHub profile is one of the strongest assets to secure a Software Engineering internship. Recruiter evaluations heavily weigh repository code structure, installation guides, and documentation.

This guide provides a professional repository template and a setup checklist.

---

## Part 1: Repository README Template
Every featured repository (e.g. `TravelAiGuideApp` or `SwaralayaMusicApp`) should contain a `README.md` file styled like the template below.

Copy the template below, replace the placeholder text inside brackets `[...]`, and save it in your repository:

```markdown
# [Project Name: e.g. Travel AI Guide App]

[![Platform: Mobile](https://img.shields.io/badge/Platform-Mobile-blue.svg)](#)
[![Framework: Flutter](https://img.shields.io/badge/Framework-Flutter-02569B.svg)](#)
[![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)](#)

[Provide a short 2-3 sentence overview explaining what the project is, the primary problem it solves, and its core value proposition. e.g. "Travel AI Guide App is a cross-platform mobile trip planner built with Flutter. It solves the manual hassle of travel research by leveraging Google's Gemini AI to generate custom itineraries, local map-based markers, and budget estimations instantly."]

## 📱 Key Features
- **Smart Itinerary Planner**: Auto-generate full daily itineraries using Google Gemini AI integrations.
- **Geographic Markers**: Interactive maps integration displaying recommended local restaurants and attractions.
- **Audio Controls**: Custom high-fidelity media playing pipelines (for Swaralaya App).
- **Secure Authentication**: User sign-in flows connected to persistent backend models.

## 🛠️ Tech Stack & Architecture
- **Framework**: Flutter & Dart (Cross-platform)
- **State Management**: [Specify: e.g., Provider / Bloc / Riverpod]
- **AI Engine**: Google Gemini API Integration via HTTP Client
- **Database**: PostgreSQL / Supabase
- **APIs**: Custom REST endpoints for user state syncing

---

## 🏗️ System Architecture
```
    ┌───────────────┐           ┌───────────────┐
    │  Flutter App  │ ◄───────► │  REST API/Db  │
    │ (Presentation)│           │   (Storage)   │
    └───────┬───────┘           └───────────────┘
            │
            ▼ (HTTP JSON payload)
    ┌───────────────┐
    │  Gemini AI    │
    │ (Intelligence)│
    └───────────────┘
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Flutter SDK (v3.19.0 or higher)
- Android Studio or Xcode (for simulator deployment)
- Your private [Gemini API Key / Backend Connection String]

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/dinuka-prasad/[repository-name].git
   ```
2. Navigate into the project folder:
   ```bash
   cd [repository-name]
   ```
3. Fetch dependencies:
   ```bash
   flutter pub get
   ```
4. Create a `.env` configuration file in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   DATABASE_URL=your_database_connection_string
   ```
5. Run the application:
   ```bash
   flutter run
   ```

## 🧪 Testing details
- **Unit Tests**: Flutter test suite covering state controller logic.
- **API Tests**: Postman verification scripts for JSON response structures.

## 🔮 Future Improvements
- [ ] Implement local offline database caching using Hive or SQLite.
- [ ] Add unit testing coverage up to 80% for state management controllers.
- [ ] Integrate background geolocation notifications for localized tips.
```

---

## Part 2: GitHub Profile Checklist

To ensure recruiter readiness, clean up your public GitHub page (`github.com/dinuka-prasad`):

1. **Pin your Best Repositories (Limit to 3-5)**:
   - Go to your GitHub profile and click **Customize your pins**.
   - Pin:
     1. `TravelAiGuideApp` (Shows AI integration and Flutter competence)
     2. `SwaralayaMusicApp` (Shows custom media control logic)
     3. `Attendly` or backend API projects (Shows full-stack/database work)
2. **Remove Unused Repositories**:
   - Delete empty repositories, basic hello-world test folders, and duplicate experiment directories. Keep your profile looking curated and purposeful.
3. **Add a Profile Bio**:
   - Write a professional summary on your GitHub profile:
     *"Software Engineering Undergraduate at ATI Dehiwala. Focused on building cross-platform Mobile Applications (Flutter & Dart), REST API integrations, and Database-driven solutions."*
