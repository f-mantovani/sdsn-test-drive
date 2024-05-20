# SDSN Techinical Test

[![Cypress](https://github.com/f-mantovani/sdsn-test-drive/actions/workflows/cypress.yml/badge.svg)](https://github.com/f-mantovani/sdsn-test-drive/actions/workflows/cypress.yml)

## How to run

### Using pnpm

#### Option 1

You already have it installed:

1. Run the script for build and start

```shell
pnpm build && pnpm start
```

or

1. Run the script to check the development evironment

```shell
pnpm dev
```

2. Access the [http://localhost:3000](localhost)

<br />

#### Option 2

You don't have pnpm installed, but want to check it out:

1. Execute the command to let node install pnpm, other methods of [installation](https://pnpm.io/installation)

```shell
corepack enable pnpm
```

2. Run the script for build and start

```shell
pnpm build && pnpm start
```

or

2. Run the script to check the development evironment

```shell
pnpm dev
```

3. Access the [http://localhost:3000](localhost)

### Using other package manager

1. Possible the best would be to delete the lock file and install the dependencies with your prefered method

```shell
 rm pnpm-lock.yaml

 npm install
 # or
 yarn install
```

2. Run the script for build and start

```shell
npm run build && npm start
# or
yarn build && yarn start
```

or

2. Run the script to check the development evironment

```shell
npm run dev
# or
yarn dev
```

3. Access the [http://localhost:3000](localhost)
