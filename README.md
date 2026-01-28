# Co-App Frontend

## About us

CoApp is a co-op application management platform, a comprehensive web application designed to streamline the student experience of the co-op job search. This platform uses React, Spring Boot, and MongoDB to address the most common challenges faced by students throughout their co-op job searches and provides an all-in-one space to manage job applications, interview preparations, and researching potential employers.

This application takes all the essential co-op organizational tools and puts them in one user-friendly interface. Students can track their job applications from the start to their outcome, maintain interview schedules for these applications with a calendar view, and access a communal “rate my co-op” review board to see what others think about their work terms. This app gets rid of the need for multiple scattered spreadsheets, tracking apps, or unorganized notes.

For further information, please check out our [Project Proposal](https://github.com/Co-App-Team/.github/blob/main/docs/ProjectProjectProposal.md).

## Project set up

### Pre-requisites
- Have node installed onto your computer. Verify by reunning `npm -version`.

### Beginning development
Before beginning, run `npm i` or `npm install` to install dependencies. 

Then, to start the development server, run `npm run dev`.

### Bootstrap/React Bootstrap
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

### elsint and Prettier

[eslint](https://eslint.org/) and [Prettier](https://prettier.io/) are configured to run on-commit using [Husky](https://typicode.github.io/husky/), or can be triggered manually using `npm run lint` or `npx prettier` and `npx eslint`.