# co-app-frontend

## Setup Instructions 

See [CONTRIBUTING.md](/.github/CONTRIBUTING.md) for setup instructions for the development environment

## Running Instructions 

First, make sure the [backend](https://github.com/Co-App-Team/backend) is running. Then, use one of the following:

### With npm

Use `npm run dev` to run the development server

### With Docker

To the run application using the Docker image, please follow steps:
1. Build docker image
```bash
docker image build -t coapp-frontend .
```

2. Run docker image
```bash
docker run -d -p 3000:3000 coapp-frontend
```

## Bootstrap/React Bootstrap
We will be using React Bootstrap as a component library. Documentation can be found [here](https://react-bootstrap.netlify.app/docs/components/buttons)

Additionally, Bootstrap provides various utility classes for styling, spacing, etc., which can be found [here](https://getbootstrap.com/docs/5.0/utilities/api/)

To use a component, first import it at the start of the `.jsx` file, for example:

```
import {Button, Container} from 'react-bootstrap'

function App(){
    <Container>
        <Button>I am a button</Button>
    </Container>
}
```

To use the utility classes on components, they require the className prop. For example, the class `m-1` adds a margin of "1 unit" around the component (for specifics on what a unit is, see the bootstrap documentation). So to use `m-1` on a React Bootstrap Button: 

```
import {Button, Container} from 'react-bootstrap'

function App(){
    <Container>
        <Button className="m-1">I am a button</Button>
    </Container>
}
```

You can add multiple classes to one component. `p-1` adds a 1 unit padding all around the container, so

```
import {Button, Container} from 'react-bootstrap'

function App(){
    <Container>
        <Button className="m-1 p-1">I am a button</Button>
    </Container>
}
```

Adds both a margin and padding around the Button.

## elsint and Prettier

[eslint](https://eslint.org/) and [Prettier](https://prettier.io/) are configured to run on-commit using [Husky](https://typicode.github.io/husky/), or can be triggered manually using `npm run lint` or `npx prettier` and `npx eslint`.