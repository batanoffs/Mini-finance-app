# Mini Finance Innovations [LIVE DEMO](https://batanoffs.github.io/mini-finance/)

This is a finance web application project. The goal is to simulate online banking by generating online virtual cards for new users, enabling account top-ups via the user's debit card, adding friends, facilitating transactions between users, and maintaining transaction history. The main focus of this project is to practice REST, React, React-router, ES6 features, CSS/CSS modules, and responsive design.

Test user accounts:
- username: ivo@abv.bg
- password: Minifinance123
- username: test@abv.bg
- password: Minifinance123


![MiniFinance-frontend](https://notablepen.backendless.app/api/files/app/AppData/home/homepage.png)


Table of Contents
=================
- [Features](#features)
- [Libraries and Services](#libraries-and-services)
- [Usage](#usage)
- [Installation](#installation)
- [Project content](#project-content)
    - [Login Register](#login-register)
    - [About](#about)
    - [Dashboard](#dashboard)
    - [Notifications](#notifications)
    - [Profile menu](#profile-menu)
    - [Transactions](#transactions)
    - [Profile settings](#profile-settings)
    - [Quick actions](#quick-actions)
    - [Last transactions](#last-transactions)
    - [Autocomplete](#autocomplete)
    - [Wallet](#wallet)
    - [Profile overview](#profile-overview)
    - [Help center](#help-center)
- [Design and Architecture](#design-and-architecture)
- [Contributing](#contributing)
- [License](#license)

## Features
- Get online virtual card generation upon register
- Account top-up via user's debit card, paypal or bank transfer
- Add friends, manage friends, add favourite friends
- Real-time notifications
- User-to-user transactions send receive money
- Transaction history tracking
- Autocomplete user input based on data
- User profile management (picture, profile details etc.)

## Libraries and Services
The project utilizes the following libraries and services:
- [backendless](https://backendless.com/) as the backend service
- [exchangerate API](https://www.exchangerate-api.com/) for real-time exchange rates
- [create-react-app](https://create-react-app.dev/) library
- [react-router](https://reactrouter.com/en/main) library
- [react credit card 2](https://www.npmjs.com/package/react-credit-cards-2) library
- [Ant Design](https://ant.design/) library for a few components
- [Font Awesome Icons](https://fontawesome.com/icons) library
- [Dotenv](https://www.npmjs.com/package/dotenv) library for secret keys
- ~~[FaceIO](https://console.faceio.net) library for face recognition~~ (removed due to trail version)

## Usage
Here are some examples of how to use this project:

1. Register
2. Topping up the account using a credit card
3. Adding friends
4. Making a transaction to another user in the ecosystem
5. Viewing transaction history
6. Changing profile info and profile picture
7. Interact with notifications

## Installation
To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/batanoffs/mini-finance.git`
2. Navigate to the project directory: `cd your-project-directory`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.
6. Login with these credentials 
    - username: ivo@abv.bg
    - password: Minifinance123

## Project content
### Login Register
### About
### Dashboard
### Notifications
### Profile menu
### Transactions
### Profile settings
### Quick actions
### Last transactions
### Autocomplete
### Wallet
### Profile overview
### Help center

## Design and Architecture

- Serverless architecture, based on `Backendless` as a provider. 
- Used `Exhange Rate API` for live update rates

#### Context Providers
- `AuthContext` – provides data of authenticated user to welcomePage
component through useContext from React. Additionally exports `useAuthContext()`

#### Custom Hooks
- `useMessage` - returns function message from Antd, which takes type and text
- `useForm(initialState, onLogin, onRegister)` - takes initial state for form,
and functions to be called on login and register. Inside it there's also useValidate hook which validates input from user. Finally it returns:
    - `values` – updated form values
    - `error` – errors if there were any during validation
    - `changeHandler` – updates form values and is used as onChange prop for input
    - `validateHandler` – validates input from user
    - `onSubmitLogin` – checks if request was successful
    - `resetFormHandler` – clears input fields
    - `onSubmitRegister` - checks if request was successful
    - `onFocusHandler` – clears currently focused input field

- `useSessionStorage(key, initialValue)` - takes key to store in sessionStorage
and initial value. Finally it returns:
    - `setSessionStorageState` – function to set current state
    - `state` - current state

- `useValidate(initialStatе)` – takes initial state which comes from useForm. Finally it returns:
    - `error` – state of errors in the current moment
    - `errorHandler` – function that validates errors and sets them in state
    - `clearErrorHandler` – function that clears errors

#### Routers
- `Main router` – located in App component
- `Secondary router` – located in WelcomePage component
#### Constants
- `baseURL` – stores base URL for backendless and exchangerate api
#### Utils
- `setNewGeneratedId()` - takes nothing. Generates random number from 0 – 100
and checks if there's already user with such id and if there is, generates
new one and returns it

- `formatDate(date)` – takes date and returns formatted

- `showLastCardDidgits(number)` – takes bank card number and returns last
four digits


#### Services
- Authentication (authService)
- Virtual card generation (cardGeneratorService)
- Exchange Rate (exchangeRateService)
- Notifications (notificationService)
- Transactions (transactionService)
- User Data (userDataService)


## Contributing
This project is maintained by [batanoffs](https://github.com/batanoffs) and is not open to additional contributions at this time.
It is inspired by the layout of "Tooplate 2135 Mini Finance Template" [link to template](https://www.tooplate.com/view/2135-mini-finance).
Some icons are used from [Julia G](https://icons8.com/illustrations/author/627444) at www.icons8.com

## License
This project is licensed under MIT Licence - see the [LICENSE.txt](https://github.com/batanoffs/mini-finance/blob/main/LICENSE.txt) file for details.


