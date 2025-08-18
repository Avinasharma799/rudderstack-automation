# rudderstack-automation
This project focus on creating automation flow for rudderstack application

## Author
👤 **Avinash Kumar**

- GitHub: [@avinash](https://github.com/Avinasharma799)
- LinkedIn: [(http://www.linkedin.com/in/avinashkumarsdet292)]

## Tech Stack

1. Language: TypeScript
2. Test Runner: WebdriverIO
3. BDD Framework: Cucumber
4. Reporting: Allure
5. CI/CD: GitHub Actions

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Avinasharma799/rudderstack-automation.git
    cd rudderstack-automation
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    - Copy `.env.example` to `.env` and update values as needed.

## Folder Structure

```
rudderstack-automation/
├── features/                # Cucumber test assets
│   ├── pageobjects/         # Page Object Model (POM) classes
│   ├── step-definitions/    # Step definitions linked to feature steps
│   └── featureName.feature  # Example feature file
├── node_modules/            # Installed NPM dependencies
├── reports/                 
│   ├── allure-report/       # Generated Allure HTML reports
│   └── allure-results/      # Raw Allure results used to build reports
├── test-data/               
│   └── api-payload/         # JSON payloads or test data for API tests
├── utils/                   
│   ├── api-helper.ts        # Reusable API call helpers (e.g., Axios)
│   └── utility.ts           # General utility functions
├── .env.example             # Example env file (safe to commit)
├── .env                     # Actual env file (sensitive, not committed)
├── wdio.conf.ts             # WebdriverIO configuration file
├── README.md                # Project documentation
├── package.json             # Project metadata, dependencies, scripts
├── tsconfig.json            # TypeScript configuration
└── .github/
    └── workflows/
        └── ci.yaml          # GitHub Actions workflow for CI/CD
```

- **features/**: Contains Cucumber feature files, pageobjects and step definitions.
- **node_modules/**: Installed NPM dependencies
- **reports/**: Allure Report and Allure Results raw data
- **wdio.conf.ts**: WebdriverIO configuration file.
- **.env.example**: Sample environment variables file.
- **.env**: Actual environment variables (not committed).
- **.github/workflows/ci.yaml**: GitHub Actions workflow for CI.

## Environment File

The `.env` file contains sensitive configuration such as app url and credentials. Always keep this file secure and never commit it to version control.

## utils

The `utils` directory provides shared helpers for API calls, logging, configuration, and other common tasks used throughout the test framework.

## Features, Page Objects & Step Definitions

The `features` directory contains Cucumber feature files, step definitions, and page objects (for web element locators). Each feature is structured for easy maintenance and clarity.


## CI Workflow

The `ci.yaml` file in `.github/workflows` defines the continuous integration pipeline. It runs tests, checks code quality, and ensures that all changes meet project standards before merging.

## Running Tests

1. **Local**: npx wdio run ./wdio.conf.ts 
To run tests via GitHub Actions with branch and environment selection:

2. **Github Actions**:

    - **Trigger Workflow**:  
        - Go to the "Actions" tab in your GitHub repository.
        - Select the desired workflow (e.g., CI).
        - Click "Run workflow" and choose the branch and environment from the dropdowns.

    - **Download Allure Report Artifact**:  
        - After the workflow completes, go to the workflow run summary.
        - Download the `allure-report` artifact from the "Artifacts" section.

    - **Unzip and Serve Report Locally**:
        ```bash
        unzip allure-report.zip
        cd ./reports/allure-report
        python3 -m http.server 8000
        ```
        - Open your browser and visit: [http://localhost:8000/index.html](http://localhost:8000/index.html)

## Reports

Test reports are generated using Allure.

- **Results**: allure-results/

- **Report**: allure-report/
