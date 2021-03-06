
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Your Publishable Key
const elements = stripe.elements();
console.log("hello from checkout" )

// Create our card inputs

const card = elements.create('card');
card.mount('#card-element');

const form = document.querySelector('#checkout-form');
const errorEl = document.querySelector('#card-errors');

// Give our token to our form
const stripeTokenHandler = token => {
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}

// Create token from card data
form.addEventListener('submit', e => {
  e.preventDefault();

  stripe.createToken(card).then(res => {
    if (res.error) errorEl.textContent = res.error.message;
    else stripeTokenHandler(res.token);
  })
})