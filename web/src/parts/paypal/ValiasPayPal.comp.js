import React from 'react'

export default function ValiasPayPal(props) {
    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
    const paypalRef = React.useRef();

    //var vexAmount = props.valias - gasFee
    

    React.useEffect(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: props.vex + " Valias NFT plus fees",
                    amount: {
                      currency_code: "USD",
                      value: props.valias,
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
            <h4 style={{color:"white"}}>Total Amount in USD : ${props.valias}</h4>
            <div ref={paypalRef} />
        </div>
    )
}