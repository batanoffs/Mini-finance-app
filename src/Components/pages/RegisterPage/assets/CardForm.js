// import { Link } from "react-router-dom";
// import { cardService } from "../../services/cardService";

// export const CardForm = (props) => {
//     // { balance: 0, issuer: "", number: "", brand: "", expiration: "", cvv: 0 }

    

//     return (
//         <div className="form-container">
//             <div className="form-content">
//                 <form action="#" method="post">
//                     <header>
//                         <h6>Генерирай своята карта</h6>
//                     </header>

//                     <label htmlFor="cardNumber">
//                         <p className="error">*</p>Card Number:
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="cardNumber"
//                         disabled
//                         id="cardNumber"
//                         placeholder="номер на карта"
//                         value={props.creditCard.number}
//                         onChange={props.changeHandler}
//                     />

//                     <label htmlFor="cardHolder">
//                         <p className="error">*</p>Issuer:
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="issuer"
//                         id="issuer"
//                         disabled
//                         placeholder="издадена от:"
//                         value={props.creditCard.issuer}
//                         onChange={props.changeHandler}
//                     />
//                     <label htmlFor="balance">
//                         <p className="error">*</p>Balance:
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="balance"
//                         id="balance"
//                         disabled
//                         placeholder="balance:"
//                         value={props.creditCard.balance}
//                         onChange={props.changeHandler}
//                     />

//                     <label htmlFor="expiryDate">
//                         <p className="error">*</p>Expiry Date:
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="expiryDate"
//                         id="expiryDate"
//                         disabled
//                         placeholder="валидна до"
//                         value={props.creditCard.expiration}
//                         onChange={props.changeHandler}
//                     />

//                     <label htmlFor="cvv">
//                         <p className="error">*</p>CVV:
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="cvv"
//                         id="cvv"
//                         disabled
//                         placeholder="CVV"
//                         value={props.creditCard.cvv}
//                         onChange={props.changeHandler}
//                     />

//                     <input
//                         type="button"
//                         className="button-primary"
//                         onClick={generateVirtualCard}
//                         value="Generate"
//                     />
//                 </form>

//                 <footer>
//                     <Link
//                         to={"/register/userinfo"}
//                         type="submit"
//                         name="prev"
//                         className="button-secondary"
//                         onClick={props.currentStepsHandler}
//                     >
//                         Назад
//                     </Link>
//                     <Link
//                         to={"/register/identity"}
//                         type="submit"
//                         name="next"
//                         className="button-primary"
//                         onClick={props.currentStepsHandler}
//                     >
//                         Напред
//                     </Link>
//                 </footer>
//             </div>
//         </div>
//     );
// };
