# SkyGym Frontend

Frontend application for the SkyGym website.

The frontend provides the public marketing pages and user interface for authentication and membership features.

## Tech Stack

- Next.js
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- i18next (multilingual support)

## Features

- Multilingual interface (LT / EN / RU)
- Responsive design
- Public marketing pages
- Authentication forms
- Integration with SkyGym API

## Project Structure

Example structure:

The project follows a modular architecture separating features, entities, and shared components.

## Getting Started

Install dependencies:
src
├── app
│ ├── (admin)
│ └── (public)
├── entities
├── features
├── shared
└── widgets

The project follows a modular architecture separating features, entities, and shared components.

## Getting Started

Install dependencies:
npm install

Run development server:
npm run dev

## Multilingual Support

Languages supported:

- Lithuanian
- English
- Russian

Translations are stored in the `shared/i18n` dictionaries.

## Production

Production website:

https://skygym.lt
