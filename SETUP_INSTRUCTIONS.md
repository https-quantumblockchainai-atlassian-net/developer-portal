# Thoth Guardian: Setup Instructions

This guide provides detailed instructions on how to set up and run the Thoth Guardian Cybersecurity Shield platform locally for development and testing.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js:** Version 18.x or higher. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** (Node Package Manager) or **Yarn** or **pnpm**: These come bundled with Node.js or can be installed separately.
    *   To install Yarn: `npm install -g yarn`
    *   To install pnpm: `npm install -g pnpm`
*   **Git:** For cloning the repository. You can download it from [git-scm.com](https://git-scm.com/).

## Step-by-Step Setup

### 1. Clone the Repository

Open your terminal or command prompt and run the following command to clone the Thoth Guardian repository to your local machine:

\`\`\`bash
git clone https://github.com/your-username/thoth-guardian.git
\`\`\`

Replace `https://github.com/your-username/thoth-guardian.git` with the actual repository URL if it's different.

### 2. Navigate to the Project Directory

Change your current directory to the newly cloned project folder:

\`\`\`bash
cd thoth-guardian
\`\`\`

### 3. Install Dependencies

Install all the necessary project dependencies. You can use npm, Yarn, or pnpm:

**Using npm:**

\`\`\`bash
npm install
\`\`\`

**Using Yarn:**

\`\`\`bash
yarn install
\`\`\`

**Using pnpm:**

\`\`\`bash
pnpm install
\`\`\`

This command will download and install all the packages listed in the `package.json` file.

### 4. Configure Environment Variables (Optional, for advanced features)

Some features might require environment variables (e.g., API keys for external services). While the core demo runs without them, if you plan to extend functionality, create a `.env.local` file in the root of your project:

\`\`\`
# Example .env.local content
# NEXT_PUBLIC_YOUR_API_KEY=your_api_key_here
# DATABASE_URL=your_database_connection_string
\`\`\`

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Do not store sensitive keys without this prefix if they are not meant for client-side use.

### 5. Run the Development Server

Start the Next.js development server. This will compile the application and make it accessible locally:

**Using npm:**

\`\`\`bash
npm run dev
\`\`\`

**Using Yarn:**

\`\`\`bash
yarn dev
\`\`\`

**Using pnpm:**

\`\`\`bash
pnpm dev
\`\`\`

The terminal will show output indicating that the server is running, typically on `http://localhost:3000`.

### 6. Access the Application

Open your web browser and navigate to:

\`\`\`
http://localhost:3000
\`\`\`

You should now see the Thoth Guardian Cybersecurity Shield platform running in your browser.

### 7. Explore and Develop

You are now ready to explore the existing features and begin developing new components. Any changes you make to the source code will trigger a hot reload in your browser, allowing for a fast development workflow.

## Common Issues & Troubleshooting

*   **`command not found: next`**: Ensure `npm install` (or `yarn install`/`pnpm install`) completed successfully and that `next` is listed in your `package.json` dependencies.
*   **Port already in use**: If port 3000 is already in use, Next.js will usually suggest another port. You can also specify a port manually: `npm run dev -- -p 4000`.
*   **Build errors**: Check your terminal for specific error messages. Often, these are syntax errors or missing imports.
*   **Missing components**: If you see errors related to `@/components/ui/` imports, ensure your `tsconfig.json` has the correct `paths` configuration for `@/`.

If you encounter persistent issues, please refer to the `BEST_PRACTICES.md` or open a support ticket.
