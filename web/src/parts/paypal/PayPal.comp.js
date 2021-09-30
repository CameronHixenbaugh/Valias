import React from 'react'

export default function PayPal(props) {
    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
    const paypalRef = React.useRef();

    var vexAmount = (props.vex * 1) * 0.119 + 0.30
    var amount = (props.vex * 1) + vexAmount
    var adjAmount = amount.toFixed(2)

    React.useEffect(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: props.vex + " Vex plus fees",
                    amount: {
                      currency_code: "USD",
                      value: adjAmount,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaid(true);
              console.log(order);
            },
            onError: (err) => {
            //   setError(err),
              console.error(err);
            },
          })
          .render(paypalRef.current);
      }, );

      if (paid) {
        return <div>Payment successful.!</div>;
      }
    
      // If any error occurs
      if (error) {
        return <div>Error Occurred in processing payment.! Please try again.</div>;
      }

    return (
        <div>
            <h4 style={{color:"white"}}>Total Amount in USD : ${adjAmount} for {props.vex} VEX</h4>
            <div ref={paypalRef} />
        </div>
    )
}