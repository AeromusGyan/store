const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")("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");

app.post("/checkout", async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: { allowed_countries: ['IN', 'US'] },
            // shipping_options: [
            //     {
            //         shipping_rate_data: {
            //             type: 'fixed_amount',
            //             fixed_amount: { amount: 0, currency: 'inr' },
            //             display_name: 'Free shipping',
            //             // tax_behavior: 'exclusive',
            //             // tax_code: 'txcd_92010001',
            //             // delivery_estimate: {
            //             //     minimum: { unit: 'business_day', value: 5 },
            //             //     maximum: { unit: 'business_day', value: 7 },
            //             // },
            //         },
            //     },
            //     {
            //         shipping_rate_data: {
            //             type: 'fixed_amount',
            //             fixed_amount: { amount: 1500, currency: 'inr' },
            //             display_name: 'Next day air',
            //             delivery_estimate: {
            //                 minimum: { unit: 'business_day', value: 1 },
            //                 maximum: { unit: 'business_day', value: 1 },
            //             },
            //         }
            //     }
            // ],
            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                        images: [item.product]
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            }
            )),
            mode: 'payment',
            success_url: "https://stripe.sciaku.com/success.html",
            cancel_url: "https://stripe.sciaku.com/cancel.html",
        });
        // Send a success response to your Angular frontend
        res.status(200).json({ message: 'Payment successful', session });
        console.log({ message: 'Payment successful', session });
    } catch (error) {
        console.error(error);
        // Send an error response to your Angular frontend
        res.status(500).json({ error: 'Payment failed' });
        next(error);
    }
});


app.listen(4242, () => console.log('app is running on 4242 port'))