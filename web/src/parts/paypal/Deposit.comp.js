import React from "react";
//import {useAddress} from "../../hooks/use-url-address.hook"
//import {useKibblesBalance} from "../../hooks/use-kibbles-balance.hook"


export default function Deposit(props) {
    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
    const paypalRef = React.useRef();

    //const address = useAddress()
    //const kibbles = useKibblesBalance(address)

    React.useEffect(() => {
      window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: props.vex + " VEX deposited",
                    amount: {
                      currency_code: "USD",
                      value: props.vex,
                    },
                    payer: {
                        email_address: "sb-wf9xr7337376@business.example.com"
                    }
                  },
                ], 
              })
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaid(true);
              console.log(order);
            },
            onError: (err) => {
              setError(err)
              console.error(err);
              //close();
            },
          })
          .render(paypalRef.current)
      }, []);

      if (paid) {
        return <div>Payment successful.!</div>;
      }
    
      // If any error occurs
      if (error) {
        return <div>Error Occurred in processing payment.! Please try again.</div>;
      }

    return (
        <React.StrictMode>
            <h4 style={{color:"white"}}>Total Amount in USD : ${props.vex} for {props.vex} VEX</h4>
            <div ref={paypalRef} />
        </React.StrictMode>
    )
}


/*import React from 'react'
import ReactDOM from 'react-dom';
import {useAddress} from "../../hooks/use-url-address.hook"
import {useKibblesBalance} from "../../hooks/use-kibbles-balance.hook"


export default function Deposit() {
    const paypalRef = React.useRef();

    const AACComponent = paypal.PayoutsAAC.driver('react', {
        React,
        ReactDOM
      });

    return (
        <AACComponent
            clientId="Af0COsrpbHyzjBBIPiUPCgBQJ76WZpv37NlCDFrC9ob_2FX7Jx9b_f6EtpAQt5bl-8aOro048FCDEIr2"
            merchantId="PENJ8JF9M8BWA"
            env="sandbox"
            pageType="login"
            onLogin={onLogin} />
    );
}



export default function Deposit(props) {
    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
    const paypalRef = React.useRef();

    const address = useAddress()
    const kibbles = useKibblesBalance(address)

    //var vexAmount = (props.vex * 1) * 0.119 + 0.30
    //var amount = (props.vex * 1) + vexAmount
    //var vexAmount = amount.toFixed(2)
    //var myButton = window.myButton

    React.useEffect(() => {
      window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: props.vex + " VEX deposited",
                    amount: {
                      currency_code: "USD",
                      value: props.vex,
                    },
                    payee: {
                        email_address: "sb-wf9xr7337376@business.example.com"
                    }
                  },
                ], 
              })
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaid(true);
              var amount = parseInt(props.vex)
              kibbles.mint(props.vex)
              console.log(order);
            },
            onError: (err) => {
              setError(err)
              console.error(err);
              //close();
            },
          })
          .render(paypalRef.current)
      }, []);

      if (paid) {
        return <div>Payment successful.!</div>;
      }
    
      // If any error occurs
      if (error) {
        return <div>Error Occurred in processing payment.! Please try again.</div>;
      }

    return (
        <React.StrictMode>
            <h4 style={{color:"white"}}>Total Amount in USD : ${props.vex} for {props.vex} VEX</h4>
            <div ref={paypalRef} />
        </React.StrictMode>
    )
}*/