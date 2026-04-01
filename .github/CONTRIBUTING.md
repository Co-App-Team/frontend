# Contributing

Thank you for contributing! This guide will help you set up the project environment.

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Co-App-Team/frontend.git
   ```

2. **Open the project**

    * Open the project in your IDE of choice.

3. **Install node.js**

    * You can install it from [nodejs.org](http://nodejs.org/en/download).
    * Or use `node --version` to verify if it is already installed

4. **Install depedencies**

    * Run `npm install` in the directory containing the repository

5. **You're ready to go!**

    * You can now run the project using `npm run dev`

## Development workflow

### Preliminary

Ensure to follow the structure as described in [ARCHITECTURE.md](../docs/ARCHITECTURE.md).

### Commit messages

Each commit should follow the structure below:

```bash
Header  # A concise summary, no more than 50 characters

Body    # Optional. Wrap lines at 72 characters
```

### Branching Process

1. Create a branch by following the convention: `task/<issue_number>-<IndicatorOfTheTask>`.
2. Merge to `develop` when the task development is completed.
3. `develop` is only merged to `main` on the release day.

> \[!IMPORTANT\]
> All task branches need to be merged to `develop`. Please avoid merging task branches directly to `main`.

 
### Prettier and elsint 

This project is configured to have code formatting using [Prettier](https://prettier.io/) and linting using [eslint](https://eslint.org/). 
For convenience we have installed a [Husky](https://typicode.github.io/husky/) pre-commit hook which if you have run `npm i` will run eslint and Prettier automatically on each commit.
Formatting/linting can be triggered manually using `npm run lint` or `npx prettier` and `npx eslint`.

All pull requests will have eslint and Prettier ran using the CI pipeline and must pass both before they can be merged.

The majority of rules configured for eslint and Prettier are the default configuration, eslint is using:
- js.configs.recommended
- reactHooks.configs.flat.recommended,
- reactRefresh.configs.vite,

and Prettier is set up with some rules like:
- Forcing `;` at the end of lines
- Using 2 spaces for tabWidth
- Forcing trailing commas 

The full configuration can be found in [eslint.config.js](../eslint.config.js) and [.prettierrc](../.prettierrc).