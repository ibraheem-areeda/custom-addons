// Import OWL
import { Component, useState } from "@odoo/owl";

// Define the component
class OTPGenerator extends Component {
    setup() {
        // Initialize the state
        this.state = useState({ otp: null });
    }

    // Method to generate OTP
    generateOTP() {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Save OTP in the state
        this.state.otp = otp;
        console.log(otp);
    }


}

// Mount the component
const app = new OTPGenerator();

