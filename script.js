/* =====================================================
   SHOPEASE - MAIN JAVASCRIPT
===================================================== */


const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1999,
        icon: "🎧",
        description:
            "Comfortable wireless headphones with clear sound and long battery life."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        icon: "⌚",
        description:
            "Smart fitness watch with activity tracking and everyday notifications."
    },

    {
        id: 3,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1599,
        icon: "🔊",
        description:
            "Portable Bluetooth speaker with powerful sound for everyday use."
    },

    {
        id: 4,
        name: "Mechanical Keyboard",
        category: "Electronics",
        price: 2899,
        icon: "⌨️",
        description:
            "Responsive mechanical keyboard designed for work and gaming."
    },

    {
        id: 5,
        name: "Cotton T-Shirt",
        category: "Fashion",
        price: 799,
        icon: "👕",
        description:
            "Comfortable cotton T-shirt suitable for everyday casual wear."
    },

    {
        id: 6,
        name: "Running Shoes",
        category: "Fashion",
        price: 1899,
        icon: "👟",
        description:
            "Lightweight running shoes designed for comfortable daily movement."
    },

    {
        id: 7,
        name: "Denim Jacket",
        category: "Fashion",
        price: 2199,
        icon: "🧥",
        description:
            "Classic denim jacket that works well with casual outfits."
    },

    {
        id: 8,
        name: "Casual Hoodie",
        category: "Fashion",
        price: 1499,
        icon: "🧢",
        description:
            "Soft and comfortable hoodie for casual everyday use."
    },

    {
        id: 9,
        name: "Travel Backpack",
        category: "Accessories",
        price: 1299,
        icon: "🎒",
        description:
            "Spacious everyday backpack suitable for college, office and travel."
    },

    {
        id: 10,
        name: "Classic Sunglasses",
        category: "Accessories",
        price: 999,
        icon: "🕶️",
        description:
            "Stylish sunglasses designed for everyday outdoor use."
    },

    {
        id: 11,
        name: "Leather Wallet",
        category: "Accessories",
        price: 699,
        icon: "👛",
        description:
            "Compact wallet with space for cards and cash."
    },

    {
        id: 12,
        name: "Premium Belt",
        category: "Accessories",
        price: 899,
        icon: "🧷",
        description:
            "Simple and durable belt suitable for formal and casual outfits."
    }

];


let cart =
    JSON.parse(
        localStorage.getItem("shopEaseCart")
    ) || [];


function saveCart() {

    localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const countElement =
        document.getElementById("cart-count");


    if (!countElement) {
        return;
    }


    let count = 0;


    cart.forEach(function(item) {

        count += item.quantity;

    });


    countElement.innerText = count;

}


function displayProducts(productList = products) {

    const container =
        document.getElementById(
            "product-container"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const noProducts =
        document.getElementById(
            "no-products"
        );


    if (productList.length === 0) {

        if (noProducts) {

            noProducts.style.display =
                "block";

        }

        return;
    }


    if (noProducts) {

        noProducts.style.display =
            "none";

    }


    productList.forEach(function(product) {


        const card =
            document.createElement("div");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <h3>
                ${product.name}
            </h3>

            <p class="product-category">
                ${product.category}
            </p>

            <p class="product-description">
                ${product.description}
            </p>

            <p class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>

            <a
                href="product.html?id=${product.id}"
                class="button">

                View Product

            </a>

        `;


        container.appendChild(card);

    });

}


function filterProducts() {

    const searchInput =
        document.getElementById(
            "search-input"
        );


    const categoryFilter =
        document.getElementById(
            "category-filter"
        );


    if (
        !searchInput ||
        !categoryFilter
    ) {

        return;

    }


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const filtered =
        products.filter(function(product) {


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "All" ||
                product.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayProducts(filtered);

}


function sortProducts() {

    const sortElement =
        document.getElementById(
            "sort-products"
        );


    if (!sortElement) {
        return;
    }


    const sort =
        sortElement.value;


    let sortedProducts =
        [...products];


    if (sort === "low") {

        sortedProducts.sort(
            function(a, b) {

                return a.price - b.price;

            }
        );

    }


    if (sort === "high") {

        sortedProducts.sort(
            function(a, b) {

                return b.price - a.price;

            }
        );

    }


    displayProducts(sortedProducts);

}


function displayProductDetails() {

    const container =
        document.getElementById(
            "product-detail"
        );


    if (!container) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        parseInt(
            params.get("id")
        );


    const product =
        products.find(
            function(p) {

                return p.id === id;

            }
        );


    if (!product) {

        container.innerHTML = `

            <h2>
                Product not found.
            </h2>

            <br>

            <a
                href="products.html"
                class="button">

                Back to Products

            </a>

        `;

        return;

    }


    container.innerHTML = `

        <div class="detail-image">
            ${product.icon}
        </div>


        <div class="detail-info">

            <h1>
                ${product.name}
            </h1>


            <p class="detail-category">
                ${product.category}
            </p>


            <p class="detail-description">
                ${product.description}
            </p>


            <p class="detail-price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>


            <div class="quantity-box">

                <label>
                    Quantity:
                </label>

                <input
                    type="number"
                    id="product-quantity"
                    value="1"
                    min="1"
                    max="10">

            </div>


            <button
                type="button"
                class="button"
                onclick="addProductToCart(${product.id})">

                Add to Cart

            </button>


            <a
                href="products.html"
                class="button secondary-button">

                Back to Products

            </a>

        </div>

    `;

}


function addProductToCart(productId) {

    const product =
        products.find(
            function(p) {

                return p.id === productId;

            }
        );


    if (!product) {
        return;
    }


    const quantityInput =
        document.getElementById(
            "product-quantity"
        );


    let quantity =
        quantityInput
            ? parseInt(quantityInput.value)
            : 1;


    if (
        !quantity ||
        quantity < 1
    ) {

        quantity = 1;

    }


    const existing =
        cart.find(
            function(item) {

                return item.id === productId;

            }
        );


    if (existing) {

        existing.quantity += quantity;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            category: product.category,

            icon: product.icon,

            quantity: quantity

        });

    }


    saveCart();

    updateCartCount();


    alert(
        product.name +
        " added to your cart!"
    );

}


function displayCart() {

    const container =
        document.getElementById(
            "cart-items"
        );


    if (!container) {
        return;
    }


    const subtotalElement =
        document.getElementById(
            "cart-subtotal"
        );


    const deliveryElement =
        document.getElementById(
            "cart-delivery"
        );


    const totalElement =
        document.getElementById(
            "cart-total"
        );


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty.
                </h2>

                <p>
                    Add some products to continue.
                </p>

                <br>

                <a
                    href="products.html"
                    class="button">

                    Browse Products

                </a>

            </div>

        `;


        if (subtotalElement) {
            subtotalElement.innerText = "₹0";
        }


        if (deliveryElement) {
            deliveryElement.innerText = "₹0";
        }


        if (totalElement) {
            totalElement.innerText = "₹0";
        }


        return;

    }


    let subtotal = 0;


    cart.forEach(function(item) {


        const itemTotal =
            item.price *
            item.quantity;


        subtotal += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <div class="cart-product-name">

                    ${item.icon}
                    ${item.name}

                </div>


                <div class="cart-product-price">

                    ₹${item.price.toLocaleString("en-IN")}
                    each

                </div>

            </div>


            <div class="cart-quantity">

                Quantity:
                ${item.quantity}

            </div>


            <div>

                ₹${itemTotal.toLocaleString("en-IN")}

            </div>


            <button
                type="button"
                class="remove-button"
                onclick="removeFromCart(${item.id})">

                Remove

            </button>

        `;


        container.appendChild(cartItem);

    });


    const delivery =
        subtotal >= 2000
            ? 0
            : 99;


    const total =
        subtotal + delivery;


    if (subtotalElement) {

        subtotalElement.innerText =
            "₹" +
            subtotal.toLocaleString("en-IN");

    }


    if (deliveryElement) {

        deliveryElement.innerText =
            delivery === 0
                ? "FREE"
                : "₹99";

    }


    if (totalElement) {

        totalElement.innerText =
            "₹" +
            total.toLocaleString("en-IN");

    }

}


function removeFromCart(productId) {

    cart =
        cart.filter(
            function(item) {

                return item.id !== productId;

            }
        );


    saveCart();

    updateCartCount();

    displayCart();

}


function completePurchase(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    const name =
        document.getElementById(
            "customer-name"
        ).value;


    const email =
        document.getElementById(
            "customer-email"
        ).value;


    const phone =
        document.getElementById(
            "customer-phone"
        ).value;


    const address =
        document.getElementById(
            "customer-address"
        ).value;


    const city =
        document.getElementById(
            "customer-city"
        ).value;


    const payment =
        document.getElementById(
            "payment-method"
        ).value;


    let subtotal = 0;


    cart.forEach(function(item) {

        subtotal +=
            item.price *
            item.quantity;

    });


    const delivery =
        subtotal >= 2000
            ? 0
            : 99;


    const total =
        subtotal + delivery;


    const orderNumber =
        "SE" +
        Date.now()
            .toString()
            .slice(-8);


    const order = {

        orderNumber:
            orderNumber,

        date:
            new Date()
                .toLocaleString("en-IN"),

        customer: {

            name:
                name,

            email:
                email,

            phone:
                phone,

            address:
                address,

            city:
                city

        },

        payment:
            payment,

        items:
            cart,

        subtotal:
            subtotal,

        delivery:
            delivery,

        total:
            total

    };


    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    cart = [];


    saveCart();


    window.location.href =
        "invoice.html";

}


function generateInvoice() {

    const container =
        document.getElementById(
            "invoice"
        );


    if (!container) {
        return;
    }


    const order =
        JSON.parse(
            localStorage.getItem(
                "lastOrder"
            )
        );


    if (!order) {

        container.innerHTML = `

            <h2>
                No invoice found.
            </h2>

            <br>

            <a
                href="products.html"
                class="button">

                Continue Shopping

            </a>

        `;

        return;

    }


    let itemRows = "";


    order.items.forEach(function(item) {


        const itemTotal =
            item.price *
            item.quantity;


        itemRows += `

            <tr>

                <td>
                    ${item.name}
                </td>

                <td>
                    ${item.quantity}
                </td>

                <td>
                    ₹${item.price.toLocaleString("en-IN")}
                </td>

                <td>
                    ₹${itemTotal.toLocaleString("en-IN")}
                </td>

            </tr>

        `;

    });


    container.innerHTML = `

        <div class="invoice-header">

            <div>

                <h1>
                    ShopEase
                </h1>

                <p>
                    Online Shopping Store
                </p>

                <p>
                    support@shopease.com
                </p>

            </div>


            <div class="invoice-meta">

                <h2>
                    INVOICE
                </h2>

                <p>
                    Invoice No:
                    ${order.orderNumber}
                </p>

                <p>
                    Date:
                    ${order.date}
                </p>

            </div>

        </div>


        <div class="customer-details">

            <h3>
                Bill To
            </h3>

            <p>

                <strong>
                    ${order.customer.name}
                </strong>

            </p>

            <p>
                ${order.customer.email}
            </p>

            <p>
                ${order.customer.phone}
            </p>

            <p>

                ${order.customer.address},
                ${order.customer.city}

            </p>

            <p>

                Payment:
                ${order.payment}

            </p>

        </div>


        <table class="invoice-table">

            <thead>

                <tr>

                    <th>
                        Product
                    </th>

                    <th>
                        Quantity
                    </th>

                    <th>
                        Price
                    </th>

                    <th>
                        Total
                    </th>

                </tr>

            </thead>


            <tbody>

                ${itemRows}

            </tbody>

        </table>


        <div class="invoice-totals">


            <div class="invoice-total-row">

                <span>
                    Subtotal
                </span>

                <span>

                    ₹${order.subtotal.toLocaleString("en-IN")}

                </span>

            </div>


            <div class="invoice-total-row">

                <span>
                    Delivery
                </span>

                <span>

                    ${
                        order.delivery === 0
                            ? "FREE"
                            : "₹" + order.delivery
                    }

                </span>

            </div>


            <div
                class="invoice-total-row
                       invoice-grand-total">

                <span>
                    Grand Total
                </span>

                <span>

                    ₹${order.total.toLocaleString("en-IN")}

                </span>

            </div>


        </div>


        <div class="invoice-thanks">

            <h3>

                Thank you for shopping
                with ShopEase!

            </h3>

            <p>

                This is a computer-generated invoice.

            </p>

        </div>

    `;

}


updateCartCount();