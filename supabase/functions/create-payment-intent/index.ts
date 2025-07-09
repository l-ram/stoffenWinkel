import { serve } from 'https://deno.land/std@0.168.0/http/server.ts?dts';

import Stripe from "https://esm.sh/stripe@13.0.0?dts";

const stripe = new Stripe("sk_test_51NGd6hHxOKIRuiFjVDa2tbop3lpsAvwidHqhghGm1yqnAADNN6eNK9Dy1JlywUFZyxVmRNB8GunKUTCBcm7xE0K500Hidujcyt", { apiVersion: "2023-10-16", });


serve(async (req) => {

    if (req.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    }


    try {
        const { amount, currency } = await req.json();

        if (!amount || !currency) {
            return new Response(
                JSON.stringify({ error: "Amount and currency are required" }),
                { status: 400 }
            );
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true },
        });
        return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
})