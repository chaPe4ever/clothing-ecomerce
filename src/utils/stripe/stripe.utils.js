import { loadStripe } from "@stripe/stripe-js";
import config from "../config/env.config.js";

export const stripePromise = loadStripe(config.getStripe().publishableKey);
