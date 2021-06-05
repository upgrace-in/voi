function initPayPalButton(ele) {
    var p = ele.parentElement;
    console(p.children[6]);
    parent.paypal.Buttons({
    style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'paypal',
    },

    createOrder: function(data, actions) {
        return actions.order.create({
        purchase_units: [{"amount":{"currency_code":"USD","value":1}}]
        });
    },

    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
    },

    onError: function(err) {
        console.log(err);
    }
    }).render('#paypal-button-container');
}

function stripe_payment() {
    var stripe = parent.Stripe('pk_test_51Iy7TESHTROt2vsbvjWmIOZEvJjBJ2JX36XTg6MywV644hXwLADs0ISsjgNTKicWsqAkTtZk3Hn4czavyQ8hLu5W00vD2ZjQG4', {
        apiVersion: "2020-08-27",
    });
    var paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
            label: 'Pay Now',
            amount: 20.00,
        },
        requestPayerName: true,
        requestPayerEmail: true,
    });

    var elements = stripe.elements();
    var prButton = elements.create('paymentRequestButton', {
        paymentRequest: paymentRequest,
    });

    paymentRequest.canMakePayment().then(function (result) {
        if (result) {
            prButton.mount('#payment-request-button');
        } else {
            document.getElementById('payment-request-button').style.display = 'none';
        }
    });
}
