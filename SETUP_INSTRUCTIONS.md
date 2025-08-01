# Thoth Guardian: Setup Instructions

This guide will walk you through setting up the Thoth Guardian web application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 18.x or higher. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** (Node Package Manager): Comes bundled with Node.js.
*   **Git**: For cloning the repository. You can download it from [git-scm.com](https://git-scm.com/).

## 1. Clone the Repository

Open your terminal or command prompt and run the following command to clone the Thoth Guardian repository:

\`\`\`bash
git clone https://github.com/your-username/thoth-guardian.git
cd thoth-guardian
\`\`\`

## 2. Install Dependencies

Navigate into the cloned project directory and install the necessary Node.js dependencies:

\`\`\`bash
npm install
\`\`\`

This command will install all the packages listed in `package.json`, including Next.js, React, Tailwind CSS, Framer Motion, and shadcn/ui components.

## 3. Configure Environment Variables (Optional)

The project might use environment variables for certain features (e.g., API keys for external integrations). If there's a `.env.local.example` file, duplicate it and rename it to `.env.local`:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Then, open `.env.local` and fill in any required values. For this project, most functionalities are simulated client-side, so external API keys might not be strictly necessary for basic operation, but check the code for any specific `process.env.NEXT_PUBLIC_...` variables.

## 4. Run the Development Server

Once the dependencies are installed, you can start the development server:

\`\`\`bash
npm run dev
\`\`\`

This will start the Next.js development server. You can now open your web browser and navigate to `http://localhost:3000` (or the port indicated in your terminal) to see the Thoth Guardian application running.

The development server supports hot-reloading, so any changes you make to the code will automatically reflect in your browser.

## 5. Build for Production (Optional)

To create a production-optimized build of the application, run:

\`\`\`bash
npm run build
\`\`\`

This command compiles and optimizes your application for deployment. The output will be in the `.next` directory.

## 6. Start Production Server (Optional)

After building, you can start the production server locally to test the optimized build:

\`\`\`bash
npm run start
\`\`\`

This will serve the production build.

---

You are now ready to explore and contribute to the Thoth Guardian project! If you encounter any issues, please refer to the `README.md` or `BEST_PRACTICES.md` for further guidance.
