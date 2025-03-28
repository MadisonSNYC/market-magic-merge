
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a8baea9a-97ae-4008-b023-5de63357c0e2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a8baea9a-97ae-4008-b023-5de63357c0e2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Refactoring Progress

### Identified Issues and Planned Fixes

We've conducted a comprehensive code audit and are working on addressing the following issues:

#### Completed Refactorings
1. **Dashboard Component Refactoring** ✅
   - Split the large, complex Dashboard component into smaller, focused components
   - Extracted data fetching logic into custom hooks
   - Separated layout concerns from data management
   - Improved maintainability and testability

#### Pending Refactorings
2. **API Client Architecture Consolidation**
   - Consolidate multiple overlapping API client implementations
   - Standardize on a single pattern for API calls
   - Improve error handling consistency
   - Enhance type safety across API boundaries

3. **Implement Consistent Type Definitions**
   - Replace `any` types with proper interfaces
   - Create shared type definitions for API responses
   - Enforce strict typing across components

4. **Establish Clear Separation of Concerns**
   - Create consistent patterns for separating data fetching, state management, and UI
   - Consider implementing more robust state management
   - Remove mixed concerns in utility files

5. **Reorganize Component Structure**
   - Move components to appropriate directories based on function
   - Group related components together
   - Create clear naming conventions

6. **Standardize Data Fetching Strategy**
   - Implement consistent approach to using mock vs. real data
   - Create proper abstractions for data fetching

7. **Implement Consistent Error Handling**
   - Create reusable error handling components and utilities
   - Standardize error display patterns
   - Add proper error logging

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Kalshi API Rate Limits

This application integrates with the Kalshi API and implements rate limiting to comply with their requirements. The following rate limit tiers apply:

### Access Tiers

| Tier     | Read (requests/second) | Write (requests/second) |
|----------|------------------------|-------------------------|
| Basic    | 10                     | 5                       |
| Advanced | 30                     | 30                      |
| Premier  | 100                    | 100                     |
| Prime    | 100                    | 400                     |

### Qualification for Tiers

- **Basic**: Completing signup
- **Advanced**: Completing [this form](https://forms.gle/iMhGvPZ1yU173jk2A)
- **Premier**: 3.75% of exchange traded volume in a given month + technical competency
- **Prime**: 7.5% of exchange traded volume in a given month + technical competency

### Rate Limit Management

Our application:
- Tracks all API requests against hourly limits
- Shows a visual indicator of current usage
- Notifies users when approaching rate limits (90% threshold)
- Automatically queues requests when limits are being approached
- Handles rate limit errors gracefully with automatic retries

### Write Operations

The following APIs fall under the write limit:
- BatchCreateOrders (each item counts as 1 transaction)
- BatchCancelOrders (each cancel counts as 0.2 transactions)
- CreateOrder
- CancelOrder
- AmendOrder
- DecreaseOrder

## Kalshi Core Terminology

The Kalshi exchange uses the following core terminology:

- **Market**: A single binary market (e.g., Trump or Harris). This is a low-level object which is part of an event.
- **Event**: A collection of markets and the basic unit that members interact with on Kalshi.
- **Series**: A collection of related events that look at similar data for determination but over disjoint time periods. Events in a series have the same ticker prefix and never have logical outcome dependencies between events.

You can find the Market, Event, and Series tickers in the "Timeline and Payout" dropdown on a market's page on the Kalshi platform.

## JavaScript Example for Kalshi API

```javascript
// Example JavaScript code for accessing Kalshi API
const axios = require('axios');

async function getKalshiMarkets() {
  try {
    const response = await axios.get('https://api.elections.kalshi.com/trade-api/v2/markets', {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      params: {
        limit: 20,
        status: 'open'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching Kalshi markets:', error);
    throw error;
  }
}
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a8baea9a-97ae-4008-b023-5de63357c0e2) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
