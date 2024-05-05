<template>
    <div class="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
        <h2 class="text-2xl font-semibold mb-4">Payment Details</h2>
        <div id="card-element" class="p-4 border border-gray-300 rounded"></div>
        <button @click="createPaymentIntent"
            class="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block w-full">
            Pay Now
        </button>
    </div>
</template>
 
<script>
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import { mapState } from 'vuex';


export default {
    data() {
        return {
            stripe: null,
            cardElement: null
        };
    },
    mounted() {
        this.initStripe();
    },
    computed: { ...mapState(["user", "url"]) },
    methods: {
        async initStripe() {
            this.stripe = await loadStripe('pk_test_51P8jBVP5bKRaxDGPXBeptbZA0wcOHLJr4AjE8vi6kRd468SYT1Po4R2nqzOGbYGjkFEMLCukhmgE3lZCXsWrvKXr00X9YQxJLj');
            const elements = this.stripe.elements();
            this.cardElement = elements.create('card', {
                style: {
                    base: {
                        fontSize: '16px',
                        fontFamily: 'Arial, sans-serif',
                        color: "red",
                        '::placeholder': {
                            color: 'red',
                        },
                        border: "1px solid red"
                    },
                },
            });
            this.cardElement.mount('#card-element');
        },
        async createPaymentIntent() {
        let config = {
                headers: {
            "Authorization": `Token ${localStorage.token}`
            }
        }

            const { data } = await axios.post(`${this.url}/payment/${this.$route.params.id}/`, {}, config);
            try {
                const { error } = await this.stripe.confirmCardPayment(data.client_secret, {
                    payment_method: {
                        card: this.cardElement,
                        billing_details: {
                            name: this.user.username
                        }
                    }
                });

                if (error) {
                    console.error("error", error);
                } else {
                    console.log('Payment successful');
                    // await axios.post(`${this.url}accept_payment/${this.$route.params.id}/`, {}, config)
                    this.$router.push({ name: 'allfilm' });
                }
            } catch (error) {
                console.error('Error confirming payment:', error.message);
            }
        }
    }
}
</script>
 