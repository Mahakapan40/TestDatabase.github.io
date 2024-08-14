import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://zisqqzpvrnzuuswrzton.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppc3FxenB2cm56dXVzd3J6dG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1NTg5MTUsImV4cCI6MjAzOTEzNDkxNX0.CyLFfqD84OhnAtyHjJPWp8O-sipKabDOHfwirLus_z8';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchProducts() {
    try {
        const { data: products, error } = await supabase
            .from('products')  // ตรวจสอบว่า table ของคุณมีชื่อ 'products'
            .select('*');

        if (error) {
            throw error;
        }

        const productList = document.getElementById('product-list');

        if (products && products.length > 0) {
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';

                productItem.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <a href="#" class="btn">Buy Now</a>
                `;

                productList.appendChild(productItem);
            });
        } else {
            productList.innerHTML = '<p>No products found.</p>';
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error fetching data: ' + error.message); // แสดงข้อความ error ในหน้าเว็บ
    }
}

// Fetch products when the page loads
fetchProducts();
