# Mini Finance Innovations

[![License: MIT](https://img.shields.io/badge/Softuniada2024-TOP10-blu)](https://softuniada.softuni.bg/) 
[![License: MIT](https://img.shields.io/badge/Licence-MIT-teal)](https://opensource.org/licenses/MIT) 
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-purple)](https://github.com/prettier/prettier)
[![styled with prettier](https://img.shields.io/badge/Finance-web_app-teal)]()

https://github.com/batanoffs/mini-finance/assets/111650687/d3e5ef51-4f2d-4225-a05e-6da467265a31

[Mini Finance Innovations](https://mini-finance.onrender.com) is a finance web application project. The goal is to simulate online banking by generating online virtual cards for new users, enabling account top-ups via the user's debit card, adding friends, facilitating transactions between users, and maintaining transaction history. The main focus of this project is to practice REST, React, React-router, ES6 features, CSS/CSS modules, and responsive design.

Notes
- Please consider that Backendless requests are **limited** for free tier and will shut down the server for a day after the limit is reached


## Table of content
- [Mini Finance Innovations](#mini-finance-innovations)
- [Test account](#test-account)
- [Features](#features)
- [Libraries and Services](#libraries-and-services)
- [Usage](#usage)
- [Installation](#installation)
- [Project content](#project-content)
- [Design and Architecture](#design-and-architecture)
- [Future updates](#future-updates)
- [Contributing](#contributing)
- [License](#license)
  

## Test account

```bash
username `ivo@abv.bg` password `Minifinance123`
```
```bash
username `test@abv.bg` password `Minifinance123`
```

## Features
- Get online virtual card generation upon register
- Account top-up via user's debit card, paypal or bank transfer
- Add friends, manage friends, add favorite friends
- Real-time notifications
- User-to-user transactions send receive money
- Transaction history tracking
- Autocomplete user input based on data
- User profile management (picture, profile details etc.)

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
5. Open your browser and go to [http://localhost:3000/](http://localhost:3000/) to view the app.
6. Login with test credentials or register new account

## Project content
 - ### Login Register
    The user can log in to the app with an existing account or register a new one.
    The registration is a multi-step process as shown below and clearly displays the user's current stage.
    There is validation implemented for the user's input.

    | Steps                                                                                                  | From left to right:                                                                                    |
    | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
    | ![register step 1](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505345/register1_xwktpp.png) | ![register step 2](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505347/register2_glrjhu.png) |
    | ![register step 3](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505348/register3_uep0et.png) | ![register step 4](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505348/register3_uep0et.png) |


- ### About
  
    ![About page](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505335/aboutapp_cu1qn5.png) 

- ### Dashboard
    Provides a central interface for managing the account, navigation, including virtual
    card, balance, last transactions, quick actions and buttons.

    |                                                Web                                                 |                                                  Mobile                                                  |
    | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
    | ![Dashboard web](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505353/preview_dcttk8.png) | ![Dashboard mobile](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505337/homemobile_hihl3d.png) |

- ### User balance
    The dashboard contains the information about the current balance of the user for quick financial overview as well virtual card details

    ![User balance](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505335/balance-card_dmewos.png)

- ### Notifications
    Provides real-time notifications for friend requests and money transactions to inform
    users in real-time. The notifications also display the time when the notification was
    created and possible actions, when the user hovers over the notification with the mouse.

    *Users can **request money** from other users in the ecosystem as long as they are in their list of friends.The form is invoked from a button located on the dashboard and allows automatic filling / **Autocomplete** of the field if the friend has been found.*
  
    | Notification Type             | Image                                                                                                                  |
    | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
    | Friend request notification   | ![Friend request](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729506877/friend-request_sevm2j.png)             |
    | Accept Friend request message | ![Accept message](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729506879/notification-friend-accept_gzoldh.png) |
    | Money recieved notification   | ![Money recieved](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729507492/notifyMoneySent_jd0usp.png)            |
    | Delete notification message   | ![Delete notification](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505338/no-notifications_zgsvkn.png)      |
    | Money request notification    | ![Money request](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729507494/notifyMoneyRequest_dkhqpv.png)          |
    | Message reject                | ![Message reject](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729507498/notifyMoneyReject_xjh7x0.png)          |

- ### Profile menu
    |                                                   Web                                                    |                                                     Mobile                                                     |
    | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
    | ![Profile web](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505340/profilemenu-web_wbdg0p.png) | ![Profile mobile](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505339/profilemenu-mobile_qaqegv.png) |

- ### Transactions
    Needs update

- ### Profile settings
    Users can change information about their account, including email, profile picture
    and information about credit card, as well as manage their notifications.

    ![Profile settings](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505353/settings-profile_xii4iw.png)

- ### Quick actions
    Provides a quick way to execute tasks such as sending money, adding friends,
    requesting money, and adding friends to a category of favorite

    |                                               Quick actions                                               |                                Add Friends and transaction buttons                                 |
    | :-------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
    | ![Quick actions](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505341/quciksend-menu_to80ws.png) | ![Add Friends](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505335/addfriend_retjnm.png) |

    |                                                Change                                                |                                                   Show buttons                                                    |                                                       Delete                                                        |
    | :--------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
    | ![Change](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505342/quicksend-change_wulpfz.png) | ![Show buttons](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505343/quicksend-change-delete_ydn46c.png) | ![Delete](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505345/quicksend-change-delete-confirm_abbg1k.png) |

- ### Last transactions
    Users can view their transaction history, which shows the last 5 transactions

- ### Autocomplete
    ![Autocomplete](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729507103/autocomplete_ztva8d.png)

- ### Wallet
    Shows all movements in the account, as well as quick buttons for
    sending money, loading money and searching for an amount
    ![Wallet](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505352/wallet_gyu5st.png)

- ### Profile overview
    Here the user can view their data and perform actions towards their friends, as well as see who they are

    |                                               Overview                                                |                                   Hover friends action buttons                                    |
    | :---------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: |
    | ![Overview](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729507496/profileoverview_x1xtdq.png) | ![Hover](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729507267/friendsActions_zv0joq.png) |

- ### Help center
    Menu for help and frequently asked questions with search functionality (still not implemented)

    ![Overview](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505336/FAQ_clao7s.png)

## Design and Architecture
Serverless architecture, based on Backendless as a provider. 
Used Exhange Rate API for live update rates

- ### Context Providers
    **AuthContext** provides data of authenticated user to welcomePage
    component through useContext from React. Additionally exports useAuthContext()

- ### Custom Hooks
    **useMessage()** returns function message from Ant Design, which takes type and text

    **useForm(initialState, onLogin, onRegister)** takes initial state for form, and functions to be called on login and register.
    Inside it there's also useValidate hook which validates input from user. Finally it returns:
    - values updated form values
    - error errors if there were any during validation
    - changeHandler updates form values and is used as onChange prop for input
    - validateHandler validates input from user
    - onSubmitLogin checks if request was successful
    - resetFormHandler clears input fields
    - onSubmitRegister checks if request was successful
    - onFocusHandler clears currently focused input field

    **useSessionStorage(key, initialValue)** takes key to store in sessionStorage
    and initial value. Finally it returns:
    - setSessionStorageState function to set current state
    - state current state

    **useValidate(initialStatе)** takes initial state which comes from useForm. Finally it returns:
    - error state of errors in the current moment
    - errorHandler function that validates errors and sets them in state
    - clearErrorHandler function that clears errors

- ### Routers
  - Main router is located in **App** component
  - Secondary router is located in **WelcomePage** component
  
- ### Constants
    **baseURL** stores base URL for backendless and exchangerate api

- ### Utils
  - **setNewGeneratedId()** takes nothing. Generates random number from 0 – 100
    and checks if there's already user with such id and if there is, generates
    new one and returns it
  - **formatDate(date)** takes date and returns formatted

  - **showLastCardDigits(number)** takes bank card number and returns last four digits

- ### Services
  - **authService** for Authentication 
  - **cardGeneratorService** for Virtual card generation 
  - **exchangeRateService** for Exchange Rate
  - **notificationService** for Notifications
  - **transactionService** for Transactions
  - **userDataService** for User Data

- ### Database schema - tables and relations 

    ![Database schema](https://res.cloudinary.com/dzh01qrmx/image/upload/v1729505808/schema_zlcpod.png)

## Future updates
- [ ] oAuth 
- [ ] Change notification settings
- [x] Change profile info 
- [ ] Age check on register
- [x] Top up account
- [ ] Language change
- [ ] Dark theme
- [ ] Chat bot
- [ ] Help center search topic
- [x] Update subscription plan
- [x] Wallet transactions

## Contributing
This project is maintained by [batanoffs](https://github.com/batanoffs) and tested by [Ivan-0101](https://github.com/Ivan-0101). Currently is not open to additional contributions.

It is inspired by the layout of [Tooplate 2135 Mini Finance Template](https://www.tooplate.com/view/2135-mini-finance).
Some icons are used from [Julia G](https://icons8.com/illustrations/author/627444) at www.icons8.com

## License
This project is licensed under MIT License - see the [LICENSE.txt](https://github.com/batanoffs/mini-finance/blob/main/LICENSE.txt) file for details.


