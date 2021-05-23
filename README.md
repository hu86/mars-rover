# Mars Rover Squad Simulator

Web app that parses a rover command string, simulates the rovers' movements, and displays an output string that represents the rovers' final co-ordinates and headings.

A hosted version is accessible at [http://marsroversquad.s3-website.eu-west-2.amazonaws.com/](http://marsroversquad.s3-website.eu-west-2.amazonaws.com/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage

This application's UI consists of one textarea control to capture the user's input string, and one read-only textarea control to display the computed output string.

The simulation of rovers is run as the user edits the input string to provide real time feedback.

In an event of invalid input string or simulation exception, an error message is displayed in place of the output textarea. The message will update or go away as the user amends the input.

Assumptions have been made:

- Simulation will not run if the input string is empty.
- The first line for the plateau's top right co-ordinate must be present in the input
- At least one rover's starting position, heading, and commands must be present in the input
- No more than one rover can start from the same position
- Rovers cannot be moved beyond the plateau, and simulation will terminate when this is about to happen
- Rovers cannot be collided into each other, and simulation will terminate when this is about to happen

For details about the input/output string format, refer to the Mars Rover technical Challenge document.

## Examples

Input:

```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

Expected output for input above:

```
1 3 N
5 1 E
```

Example invalid input (unknown command `X`):

```
5 5
1 2 N
X
```

Example error message:

```
Invalid input string. There should be at least 1 line to indicate the upper-right coordinates of the plateau, and two lines for each rover to indicate the rover's position and commands.
```

## Try It Out

A hosted version is accessible at [http://marsroversquad.s3-website.eu-west-2.amazonaws.com/](http://marsroversquad.s3-website.eu-west-2.amazonaws.com/).

To run locally in development mode, you need [NPM](https://www.npmjs.com/get-npm):

1. Run `npm install` in the project directory to install dependencies.
2. Run `npm start` in the project directory and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build the app for production to the `build` folder, run `npm run build`.

## Code Structure

Simulation logic, model types, and the parser/formatter utility code are in the ./src/lib folder.

For UI/React code, see the .tsx files.

## Quality and Tests

In the project directory, you can run:

- `npm test` to launch the test runner in the interactive watch mode.
  - An accessibility test is also included for detecting [axe](https://www.deque.com/axe/) violations.
- `npm test -- --coverage` to include a coverage report (should be over 80% overall).

- `npm run typecheck` to check for TypeScript errors.

- `npm run lint` to check for lint errors with ESLint
