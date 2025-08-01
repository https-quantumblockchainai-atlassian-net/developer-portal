# Thoth Guardian Setup Instructions

Follow these instructions to set up the Thoth Guardian project on your local machine.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Git

## Installation

1.  **Clone the repository:**

    \`\`\`bash
    git clone https://github.com/crystalalchemist/thoth-guardian.git
    cd thoth-guardian
    \`\`\`
2.  **Install dependencies:**

    \`\`\`bash
    npm install
    \`\`\`

    or

    \`\`\`bash
    yarn install
    \`\`\`
3.  **Configure environment variables:**

    - Create a `.env` file in the root directory.
    - Add the necessary environment variables (e.g., database connection strings, API keys).

4.  **Run the development server:**

    \`\`\`bash
    npm run dev
    \`\`\`

    or

    \`\`\`bash
    yarn dev
    \`\`\`

    This will start the development server at `http://localhost:3000`.

## Building for Production

1.  **Build the project:**

    \`\`\`bash
    npm run build
    \`\`\`

    or

    \`\`\`bash
    yarn build
    \`\`\`
2.  **Start the production server:**

    \`\`\`bash
    npm start
    \`\`\`

    or

    \`\`\`bash
    yarn start
    \`\`\`

## Additional Notes

- Ensure that all dependencies are installed correctly.
- Verify that the environment variables are configured properly.
- Check the console for any error messages during the build or startup process.

For further assistance, please contact crystal@thothguardian.com.
