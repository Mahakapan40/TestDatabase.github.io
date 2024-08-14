// signup.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form submission

        // Reset errors
        usernameError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        confirmPasswordError.style.display = 'none';

        let hasError = false;

        // Check if all fields are filled
        if (!username.value.trim()) {
            usernameError.style.display = 'block';
            hasError = true;
        }

        if (!email.value.trim() || !validateEmail(email.value.trim())) {
            emailError.style.display = 'block';
            hasError = true;
        }

        if (!password.value.trim()) {
            passwordError.style.display = 'block';
            hasError = true;
        }

        // Check if passwords match
        if (password.value.trim() !== confirmPassword.value.trim()) {
            confirmPasswordError.style.display = 'block';
            hasError = true;
        }

        if (hasError) {
            return;
        }

        // If validation passes
        const { data, error } = await supabase
            .from('users')
            .insert([{ username: username.value.trim(), email: email.value.trim(), password: password.value.trim() }]);

        if (error) {
            console.error('Error signing up:', error.message);
        } else {
            console.log('User signed up:', data);
            // Redirect or show a success message
            window.location.href = 'login.html'; // Redirect to login page
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
