import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://zisqqzpvrnzuuswrzton.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppc3FxenB2cm56dXVzd3J6dG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1NTg5MTUsImV4cCI6MjAzOTEzNDkxNX0.CyLFfqD84OhnAtyHjJPWp8O-sipKabDOHfwirLus_z8';
const supabase = createClient(supabaseUrl, supabaseKey);

// Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert('Error logging in: ' + error.message);
    } else {
        alert('Login successful!');
        // Redirect to another page or update UI as needed
        window.location.href = 'index.html'; // เปลี่ยนเส้นทางหลังจากล็อกอินสำเร็จ
    }
});
