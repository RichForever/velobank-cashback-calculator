# Cashback Calculator

A simple cashback calculator built with React and Chakra UI that allows users to input expenses and calculate cashback on those expenses.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add an expense and automatically calculate cashback based on a predefined percentage.
- View a list of all added expenses with their respective cashback values.
- Dynamically update the total cashback and remaining balance.
- Delete any expense from the list, and the cashback totals are automatically recalculated.
- User-friendly interface built with Chakra UI components.

## Demo

You can check out the live demo of the project [here](#) (replace with your live demo link).

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cashback-calculator.git

2. Navigate into the project directory:

   ```bash
   cd cashback-calculator
   
3. Install dependencies:

   ```bash
   npm install
   
4. Start the development server:

   ```bash
   npm start

The app will run on http://localhost:3000/

## Usage

1. **Add Expense:** Enter an expense amount in the input field and click the "Add" button. The app will calculate the cashback and display the results in the list below.
2. **Delete Expense:** To remove an expense from the list, click the delete button next to the corresponding item.
3. **Track Total Cashback:** The total cashback is displayed and updated automatically as expenses are added or deleted.

## Technologies Used
- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/) - A simple, modular, and accessible component library for React.
- [UUID](https://www.npmjs.com/package/uuid) - For generating unique IDs for each expense.

## File Structure
```
cashback-calculator/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
├── src/
│   ├── CalcForm.jsx
│   ├── index.css
│   ├── index.js
│   ├── VeloCashbackCalculator.js
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── .gitignore
```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.
1. Fork the repo
2. Create your feature branch: git checkout -b feature-name
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin feature-name
5. Submit a pull request

## License
This project is licensed under the MIT License. See the LICENSE file for more information.