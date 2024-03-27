<a href="https://batanoffs.github.io/mini-finance/"> <h1 align="center">Mini Finance Innovations</h1> </a>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Mini Finance Innovations](https://batanoffs.github.io/mini-finance/) is a finance web application project. The goal is to simulate online banking by generating online virtual cards for new users, enabling account top-ups via the user's debit card, adding friends, facilitating transactions between users, and maintaining transaction history. The main focus of this project is to practice REST, React, React-router, ES6 features, CSS/CSS modules, and responsive design.

![MiniFinance-frontend](https://notablepen.backendless.app/api/files/app/AppData/home/homepage.png)


Table of Contents
=================
- [Test account](#test-account)
- [Features](#features)
- [Future updates](#future-updates)
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

## Test account
- username `ivo@abv.bg` password `Minifinance123` 
- username `test@abv.bg` password `Minifinance123`<br>

## Features
- Get online virtual card generation upon register
- Account top-up via user's debit card, paypal or bank transfer
- Add friends, manage friends, add favourite friends
- Real-time notifications
- User-to-user transactions send receive money
- Transaction history tracking
- Autocomplete user input based on data
- User profile management (picture, profile details etc.)

## Future updates
- [ ] oAuth 
- [ ] Change notification settings
- [ ] Change profile info 
- [ ] Age check on register
- [ ] Top up account
- [ ] Language change
- [ ] Dark theme
- [ ] Chat bot
- [ ] Help center search topic
- [ ] Update subscription plan
- [ ] Wallet transactions

## Libraries and Services
The project utilizes the following libraries and services:
- [Backendless](https://backendless.com/) as the backend service
- [Exchange Rate API](https://www.exchangerate-api.com/) for real-time exchange rates
- [Create-react-app](https://create-react-app.dev/) library
- [React-router](https://reactrouter.com/en/main) library
- [React credit card 2](https://www.npmjs.com/package/react-credit-cards-2) library
- [Ant Design](https://ant.design/) library for a few components
- [Font Awesome Icons](https://fontawesome.com/icons) library
- [Dotenv](https://www.npmjs.com/package/dotenv) library for secret keys
- ~~[FaceIO](https://console.faceio.net) library for face recognition~~ (removed due to trail version)

## Usage
Here are some examples of how to use this project:

1. Register
1. Topping up the account using a credit card
1. Add friends
1. Remove friends
1. Making a transaction to another user in the ecosystem of "Mini Finance Innovations"
1. Viewing transactions history
1. Changing profile info and profile picture
1. Interact with notifications

## Installation
To get started with this project, follow these steps:

1. Clone the repository
```bash
git clone https://github.com/batanoffs/mini-finance.git
```
2. Navigate to the project directory: `cd your-project-directory`
3. Install dependencies: 
```bash
npm install
```
4. Start the development server:
```bash
npm start
```
5. Open your browser and go to [http://localhost:3000/mini-finance/](http://localhost:3000/mini-finance/) to view the app.
6. Login with test credentials or register new account

## Project content

### Login Register
The user can log in to the app with an existing account or register a new one.
The registration is a multi-step process as shown below and clearly displays the user's current stage.
There is validation implemented for the user's input.

1 step                                                                                          | 2 step 
:----------------------------------------------------------------------------------------------:|:-------------------------:
![register step 1](https://notablepen.backendless.app/api/files/app/AppData/docs/regsteps1.png) | ![register step 2](https://notablepen.backendless.app/api/files/app/AppData/docs/regsteps2.png)

3 step                                                                                          | 4 step 
:----------------------------------------------------------------------------------------------:|:-------------------------:
![register step 3](https://notablepen.backendless.app/api/files/app/AppData/docs/regsteps3.png) | ![register step 4](https://notablepen.backendless.app/api/files/app/AppData/docs/regsteps4.png)


### About
![About page](https://notablepen.backendless.app/api/files/app/AppData/docs/aboutpage.png) 

### Dashboard
Provides a central interface for managing the account, navigation, including virtual
card, balance, last transactions, quick actions and buttons.

Web                                                                                               |  Mobile 
:------------------------------------------------------------------------------------------------:|:-------------------------:
![Dashboard web](https://notablepen.backendless.app/api/files/app/AppData/docs/dashoboardWeb.png) |  ![Dashboard mobile](https://notablepen.backendless.app/api/files/app/AppData/docs/dashoboardMobile.png)

### Notifications
Provides real-time notifications for friend requests and money transactions to inform
users in real-time. The notifications also display the time when the notification was
created and possible actions, when the user hovers over the notification with the mouse.

Friend request notification                                                                     |  Accept Friend request message 
:----------------------------------------------------------------------------------------------:|:-------------------------:
![Friend request](https://notablepen.backendless.app/api/files/app/AppData/docs/notifyFriendRequest.png)  |![Message accept](https://notablepen.backendless.app/api/files/app/AppData/docs/notifyFriendRequestAcceptMessage.png)

Money recieved notification                                                                     |  Delete notification message 
:----------------------------------------------------------------------------------------------:|:-------------------------:
![Money recieved](https://notablepen.backendless.app/api/files/app/AppData/docs/notifyMoneySent.png)  |![Message delete](https://notablepen.backendless.app/api/files/app/AppData/docs/notifyDeleted.png)

Money request notification                                                                               |  Message reject  
:-------------------------------------------------------------------------------------------------------:|:-------------------------:
![Money request](https://notablepen.backendless.app/api/files/app/AppData/docs/notifyMoneyRequest.png)   |![Message reject](https://notablepen.backendless.app/api/files/app/AppData/docs/notifyMoneyReject.png)

Users can **request money** from other users in the ecosystem as long as they are in their list of friends.The form is invoked from a button located on the dashboard and allows automatic filling / **Autocomplete** of the field if the friend has been found.

### Profile menu
Web                                                                                               |  Mobile 
:------------------------------------------------------------------------------------------------:|:-------------------------:
![Profile web](https://notablepen.backendless.app/api/files/app/AppData/docs/NavigationMenuWeb.png)  |![Profile mobile](https://notablepen.backendless.app/api/files/app/AppData/docs/navigatioMenuMobile.png)

### Transactions
Needs update

### Profile settings
Users can change information about their account, including email, profile picture
and information about credit card, as well as manage their notifications.

![Profile settings](https://notablepen.backendless.app/api/files/app/AppData/docs/settingsPage.png)
### Quick actions
Provides a quick way to execute tasks such as sending money, adding friends,
requesting money, and adding friends to a category of favorite

Quick actions                                                                                       | Add Friends and transaction buttons                    
:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------:
![Quick actions](https://notablepen.backendless.app/api/files/app/AppData/docs/quickActionsAdd.png) |![Add Friends](https://notablepen.backendless.app/api/files/app/AppData/docs/addFriend.png) 
 
Change                                                                      | Show buttons                                               | Delete
:--------------------------------------------------------------------------:|:----------------------------------------------------------:|:----------------------------------------:
![Change](https://notablepen.backendless.app/api/files/app/AppData/docs/quickActionsMenuChange.png) | ![Show buttons](https://notablepen.backendless.app/api/files/app/AppData/docs/quickActionsDelete.png) | ![Delete](https://notablepen.backendless.app/api/files/app/AppData/docs/quickActionsOnDelete.png)

### Last transactions
Users can view their transaction history, which shows the last 5 transactions

### Autocomplete
![Autocomplete](https://notablepen.backendless.app/api/files/app/AppData/docs/autocomplete.png)

### Wallet
Shows all movements in the account, as well as quick buttons for
sending money, loading money and searching for an amount
![Autocomplete](https://notablepen.backendless.app/api/files/app/AppData/docs/wallet.png)

### Profile overview
Here the user can view their data and perform actions towards their friends, as well as see who they are

Overview                                                                                          | Hover friends action buttons 
:------------------------------------------------------------------------------------------------:|:-------------------------:
![Overview](https://notablepen.backendless.app/api/files/app/AppData/docs/profileoverview.png) |  ![Hover](https://notablepen.backendless.app/api/files/app/AppData/docs/friendsActions.png)
### Help center
Menu for help and frequently asked questions with search functionality (still not implemented)

![Overview](https://notablepen.backendless.app/api/files/app/AppData/docs/help.png)

## Design and Architecture

- Serverless architecture, based on `Backendless` as a provider. 
- Used `Exhange Rate API` for live update rates

#### Context Providers
`AuthContext` – provides data of authenticated user to welcomePage
component through useContext from React. Additionally exports `useAuthContext()`

#### Custom Hooks
`useMessage()` - returns function message from Antd, which takes type and text
`useForm(initialState, onLogin, onRegister)` - takes initial state for form,
and functions to be called on login and register. Inside it there's also useValidate hook which validates input from user. Finally it returns:
- `values` – updated form values
- `error` – errors if there were any during validation
- `changeHandler` – updates form values and is used as onChange prop for input
- `validateHandler` – validates input from user
- `onSubmitLogin` – checks if request was successful
- `resetFormHandler` – clears input fields
- `onSubmitRegister` - checks if request was successful
- `onFocusHandler` – clears currently focused input field

`useSessionStorage(key, initialValue)` - takes key to store in sessionStorage
and initial value. Finally it returns:
- `setSessionStorageState` – function to set current state
- `state` - current state

`useValidate(initialStatе)` – takes initial state which comes from useForm. Finally it returns:
- `error` – state of errors in the current moment
- `errorHandler` – function that validates errors and sets them in state
- `clearErrorHandler` – function that clears errors

#### Routers
- `Main router` – located in App component
- `Secondary router` – located in WelcomePage component
#### Constants
`baseURL` – stores base URL for backendless and exchangerate api
#### Utils
`setNewGeneratedId()` - takes nothing. Generates random number from 0 – 100
and checks if there's already user with such id and if there is, generates
new one and returns it

`formatDate(date)` – takes date and returns formatted

`showLastCardDidgits(number)` – takes bank card number and returns last
four digits

#### Services
- Authentication `authService`
- Virtual card generation `cardGeneratorService`
- Exchange Rate `exchangeRateService`
- Notifications `notificationService`
- Transactions `transactionService`
- User Data `userDataService`

#### Database schema - tables and relations 

![Database schema](https://notablepen.backendless.app/api/files/app/AppData/docs/schema.png)


## Contributing
This project is maintained by [batanoffs](https://github.com/batanoffs) and is not open to additional contributions at this time.
It is inspired by the layout of [Tooplate 2135 Mini Finance Template](https://www.tooplate.com/view/2135-mini-finance).
Some icons are used from [Julia G](https://icons8.com/illustrations/author/627444) at www.icons8.com

## License
This project is licensed under MIT Licence - see the [LICENSE.txt](https://github.com/batanoffs/mini-finance/blob/main/LICENSE.txt) file for details.


