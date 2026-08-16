/* =========================================
   DELFRONTDEV
   MAIN JAVASCRIPT
========================================= */

/* =========================================
   CONFIGURATION
========================================= */

const STORE_CONFIG = {
    brandName: "DELFRONTDEV",
    email: "realdsanz@gmail.com",
    whatsapp: "6283835154612"
};

/* =========================================
   PRODUCT DATA
========================================= */

const products = [
    {
        id: 1,
        name: "DLTH-01 RShadow",
        category: "sneakers",
        categoryLabel: "Sneakers",
        price: 899000,
        tag: "BEST SELLER",
        rating: 5,
        image:"img/DLTH-01.jpg", 
        description:"Silhouette modern dengan karakter minimalis. Dirancang menggunakan material premium dan cushioning yang nyaman untuk penggunaan sehari-hari."
    },

    {
        id: 2,
        name: "DLTH-02 Urban",
        category: "casual",
        categoryLabel: "Casual",
        price: 799000,
        tag: "NEW",
        rating: 5,
        image: "img/DLTH-02.jpg",
        description:"Sepatu casual dengan desain clean dan versatile. Cocok dipadukan dengan outfit santai maupun semi-formal."
    },

    {
        id: 3,
        name: "DLTH-03 MotionSpeed",
        category: "running",
        categoryLabel: "Running",
        price: 999000,
        tag: "PERFORMANCE",
        rating: 5,
        image:"img/DLTH-03.jpg",
        description:"Dibuat untuk movement. Sol responsif dan konstruksi ringan memberikan support untuk aktivitas harian maupun olahraga."
    },


    {
        id: 4,
        name: "DLTH-04 Ec",
        category: "sneakers",
        categoryLabel: "Sneakers",
        price: 849000,
        tag: "LIMITED",
        rating: 5,
        image:"img/DLTH-04.jpg",
        description:"Desain monochrome dengan detail subtle. Pilihan ideal untuk kamu yang menyukai tampilan clean dan understated."
    },

    {
        id: 5,
        name: "DLTH-05 Street",
        category: "casual",
        categoryLabel: "Casual",
        price: 749000,
        tag: "POPULAR",
        rating: 4,
        image:"img/DLTH-05.jpg",
        description:"Street-inspired footwear dengan bentuk kontemporer. Ringan, fleksibel, dan cocok digunakan sepanjang hari."
    },

    {
        id: 6,
        name: "DLTH-06 Aero",
        category: "running",
        categoryLabel: "Running",
        price: 1099000,
        tag: "PREMIUM",
        rating: 5,
        image:"img/DLTH-06.jpg",
        description:"Model performance premium dengan konstruksi ringan dan breathable upper untuk kenyamanan maksimal saat bergerak."
    }
];


/* =========================================
   STATE
========================================= */

let cart = [];
let selectedProduct = null;
let selectedSize = null;

/* =========================================
   DOM
========================================= */

const loader =
    document.getElementById("loader");
const navbar =
    document.getElementById("navbar");
const navMenu =
    document.getElementById("navMenu");
const menuToggle =
    document.getElementById("menuToggle");
const searchToggle =
    document.getElementById("searchToggle");
const searchOverlay =
    document.getElementById("searchOverlay");
const closeSearch =
    document.getElementById("closeSearch");
const searchInput =
    document.getElementById("searchInput");
const productGrid =
    document.getElementById("productGrid");
const filterButtons =
    document.querySelectorAll(".filter-btn");
const productResult =
    document.getElementById("productResult");
const cartToggle =
    document.getElementById("cartToggle");
const cartSidebar =
    document.getElementById("cartSidebar");
const cartOverlay =
    document.getElementById("cartOverlay");
const cartClose =
    document.getElementById("cartClose");
const cartItems =
    document.getElementById("cartItems");
const cartFooter =
    document.getElementById("cartFooter");
const cartCount =
    document.getElementById("cartCount");
const cartTotal =
    document.getElementById("cartTotal");
const startShopping =
    document.getElementById("startShopping");
const checkoutBtn =
    document.getElementById("checkoutBtn");
const productModal =
    document.getElementById("productModal");
const closeProductModal =
    document.getElementById("closeProductModal");
const modalProductImage =
    document.getElementById("modalProductImage");
const modalProductCategory =
    document.getElementById("modalProductCategory");
const modalProductName =
    document.getElementById("modalProductName");
const modalProductPrice =
    document.getElementById("modalProductPrice");
const modalProductDescription =
    document.getElementById("modalProductDescription");
const modalSizes =
    document.getElementById("modalSizes");
const modalAddCart =
    document.getElementById("modalAddCart");
const checkoutModal =
    document.getElementById("checkoutModal");
const closeCheckout =
    document.getElementById("closeCheckout");
const checkoutForm =
    document.getElementById("checkoutForm");
const checkoutItems =
    document.getElementById("checkoutItems");
const checkoutTotal =
    document.getElementById("checkoutTotal");
const contactForm =
    document.getElementById("contactForm");
const toast =
    document.getElementById("toast");
const toastMessage =
    document.getElementById("toastMessage");
const backToTop =
    document.getElementById("backToTop");

/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {
    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(price);
}

/* =========================================
   LOADING
========================================= */

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 700);
});

/* =========================================
   NAVBAR SCROLL
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

/* =========================================
   MOBILE MENU
========================================= */

menuToggle.addEventListener(
    "click",
    () => {
        navMenu.classList.toggle("active");
    }
);

document
    .querySelectorAll(".nav-link")
    .forEach(link => {
        link.addEventListener(
            "click",
            () => {
                navMenu.classList.remove(
                    "active"
                );
            }
        );
    });

/* =========================================
   SEARCH
========================================= */

searchToggle.addEventListener(
    "click",
    () => {
        searchOverlay.classList.add(
            "active"
        );
        document.body.classList.add(
            "no-scroll"
        );
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    }
);

function closeSearchOverlay() {
    searchOverlay.classList.remove(
        "active"
    );
    document.body.classList.remove(
        "no-scroll"
    );
    searchInput.value = "";
    renderProducts("all");
}

closeSearch.addEventListener(
    "click",
    closeSearchOverlay
);

searchOverlay.addEventListener(
    "click",
    event => {
        if (
            event.target ===
            searchOverlay
        ) {
            closeSearchOverlay();
        }
    }
);

searchInput.addEventListener(
    "input",
    event => {
        const keyword =
            event.target.value
                .toLowerCase()
                .trim();
        const filtered =
            products.filter(product => {
                return (
                    product.name
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    product.categoryLabel
                        .toLowerCase()
                        .includes(keyword)
                );
            });

        renderProductList(filtered);
    }
);

/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts(
    category = "all"
) {

    let filteredProducts = products;
    if (category !== "all") {
        filteredProducts =
            products.filter(
                product =>
                    product.category ===
                    category
            );
    }

    renderProductList(
        filteredProducts
    );
}

function renderProductList(
    productList
) {
    productGrid.innerHTML = "";
    productResult.textContent =
        `${productList.length} Products`;

    if (productList.length === 0) {
        productGrid.innerHTML = `
            <div
                style="
                    grid-column: 1/-1;
                    padding: 80px 20px;
                    text-align: center;
                "
            >
                <i
                    class="fa-solid fa-magnifying-glass"
                    style="
                        font-size:40px;
                        color:#ccc;
                        margin-bottom:20px;
                    "
                ></i>

                <h3>
                    Produk tidak ditemukan
                </h3>

                <p
                    style="
                        margin-top:10px;
                        color:#999;
                    "
                >
                    Coba kata pencarian lainnya.
                </p>

            </div>

        `;

        return;

    }


    productList.forEach(product => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "product-card";


        const stars =
            "★".repeat(
                product.rating
            );


        card.innerHTML = `

            <div class="product-image">

                <span class="product-tag">
                    ${product.tag}
                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <button
                    class="product-quick-view"
                    data-id="${product.id}"
                >
                    Quick View
                </button>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.categoryLabel}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <span class="product-price">
                    ${formatPrice(product.price)}
                </span>

                <span class="product-rating">
                    ${stars}
                </span>

            </div>

        `;


        const quickView =
            card.querySelector(
                ".product-quick-view"
            );


        quickView.addEventListener(
            "click",
            () => {

                openProductModal(
                    product.id
                );

            }
        );


        productGrid.appendChild(card);

    });

}


/* =========================================
   FILTER
========================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );


            button.classList.add(
                "active"
            );


            const category =
                button.dataset.category;


            renderProducts(
                category
            );

        }
    );

});


/* =========================================
   PRODUCT MODAL
========================================= */

function openProductModal(
    productId
) {

    selectedProduct =
        products.find(
            product =>
                product.id ===
                productId
        );


    if (!selectedProduct) {

        return;

    }


    selectedSize = null;


    modalProductImage.src =
        selectedProduct.image;

    modalProductImage.alt =
        selectedProduct.name;

    modalProductCategory.textContent =
        selectedProduct.categoryLabel;

    modalProductName.textContent =
        selectedProduct.name;

    modalProductPrice.textContent =
        formatPrice(
            selectedProduct.price
        );

    modalProductDescription.textContent =
        selectedProduct.description;


    document
        .querySelectorAll(
            "#modalSizes button"
        )
        .forEach(button => {

            button.classList.remove(
                "selected"
            );

        });


    productModal.classList.add(
        "active"
    );

    document.body.classList.add(
        "no-scroll"
    );

}


function closeProductModalFunction() {

    productModal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


closeProductModal.addEventListener(
    "click",
    closeProductModalFunction
);


productModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            productModal
        ) {

            closeProductModalFunction();

        }

    }
);


/* =========================================
   SELECT SIZE
========================================= */

document
    .querySelectorAll(
        "#modalSizes button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        "#modalSizes button"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "selected"
                            )
                    );


                button.classList.add(
                    "selected"
                );


                selectedSize =
                    button.dataset.size;

            }
        );

    });


/* =========================================
   ADD TO CART FROM MODAL
========================================= */

modalAddCart.addEventListener(
    "click",
    () => {

        if (!selectedProduct) {

            return;

        }


        if (!selectedSize) {

            showToast(
                "Silakan pilih ukuran terlebih dahulu."
            );

            return;

        }


        addToCart(
            selectedProduct,
            selectedSize
        );


        closeProductModalFunction();

    }
);


/* =========================================
   CART
========================================= */

function addToCart(
    product,
    size
) {

    const existing =
        cart.find(item =>
            item.product.id === product.id
            &&
            item.size === size
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            product: product,

            size: size,

            quantity: 1

        });

    }


    updateCart();

    showToast(
        `${product.name} berhasil ditambahkan.`
    );

}


function updateCart() {

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total +
                item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;


    renderCart();

}


function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>
                    Your bag is empty
                </h3>

                <p>
                    Tambahkan produk favoritmu
                    ke dalam bag.
                </p>

                <button
                    class="btn btn-outline"
                    id="startShoppingDynamic"
                >
                    Start Shopping
                </button>

            </div>

        `;


        const dynamicButton =
            document.getElementById(
                "startShoppingDynamic"
            );


        if (dynamicButton) {

            dynamicButton.addEventListener(
                "click",
                () => {

                    closeCart();

                    document
                        .getElementById(
                            "collection"
                        )
                        .scrollIntoView();

                }
            );

        }


        cartFooter.style.display =
            "none";


        return;

    }


    cartFooter.style.display =
        "block";


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(
        (item, index) => {

            const itemTotal =
                item.product.price *
                item.quantity;


            total += itemTotal;


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "cart-item";


            element.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.product.image}"
                        alt="${item.product.name}"
                    >

                </div>

                <div class="cart-item-info">

                    <h4>
                        ${item.product.name}
                    </h4>

                    <span>
                        Size EU ${item.size}
                    </span>

                    <div class="cart-item-price">
                        ${formatPrice(itemTotal)}
                    </div>

                    <div class="cart-controls">

                        <button
                            class="decrease-item"
                            data-index="${index}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="increase-item"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    data-index="${index}"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            `;


            cartItems.appendChild(
                element
            );

        }
    );


    cartTotal.textContent =
        formatPrice(total);


    attachCartEvents();

}


function attachCartEvents() {

    document
        .querySelectorAll(
            ".increase-item"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    cart[index].quantity++;

                    updateCart();

                }
            );

        });


    document
        .querySelectorAll(
            ".decrease-item"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        cart[index].quantity >
                        1
                    ) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(
                            index,
                            1
                        );

                    }


                    updateCart();

                }
            );

        });


    document
        .querySelectorAll(
            ".remove-item"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    const removed =
                        cart[index];

                    cart.splice(
                        index,
                        1
                    );

                    updateCart();

                    showToast(
                        `${removed.product.name} dihapus dari bag.`
                    );

                }
            );

        });

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    cartSidebar.classList.add(
        "active"
    );

    cartOverlay.classList.add(
        "active"
    );

    document.body.classList.add(
        "no-scroll"
    );

}


function closeCart() {

    cartSidebar.classList.remove(
        "active"
    );

    cartOverlay.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


cartToggle.addEventListener(
    "click",
    openCart
);


cartClose.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);


if (startShopping) {

    startShopping.addEventListener(
        "click",
        () => {

            closeCart();

            document
                .getElementById(
                    "collection"
                )
                .scrollIntoView();

        }
    );

}


/* =========================================
   CHECKOUT
========================================= */

checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Keranjang masih kosong."
            );

            return;

        }


        renderCheckout();


        checkoutModal.classList.add(
            "active"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }
);


function renderCheckout() {

    checkoutItems.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.product.price *
            item.quantity;


        total += itemTotal;


        const row =
            document.createElement(
                "div"
            );


        row.className =
            "summary-product";


        row.innerHTML = `

            <span>
                ${item.product.name}
                × ${item.quantity}
                <small>
                    (EU ${item.size})
                </small>
            </span>

            <strong>
                ${formatPrice(itemTotal)}
            </strong>

        `;


        checkoutItems.appendChild(
            row
        );

    });


    checkoutTotal.textContent =
        formatPrice(total);

}


closeCheckout.addEventListener(
    "click",
    () => {

        checkoutModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }
);


checkoutModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            checkoutModal
        ) {

            checkoutModal.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "no-scroll"
            );

        }

    }
);


/* =========================================
   SUBMIT ORDER TO WHATSAPP
========================================= */

checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "orderName"
                )
                .value
                .trim();


        const phone =
            document
                .getElementById(
                    "orderPhone"
                )
                .value
                .trim();


        const address =
            document
                .getElementById(
                    "orderAddress"
                )
                .value
                .trim();


        const note =
            document
                .getElementById(
                    "orderNote"
                )
                .value
                .trim();


        let message =
            `Halo ${STORE_CONFIG.brandName}, saya ingin melakukan order.%0A%0A`;


        message +=
            `*DATA PEMESAN*%0A`;

        message +=
            `Nama: ${name}%0A`;

        message +=
            `WhatsApp: ${phone}%0A`;

        message +=
            `Alamat: ${address}%0A`;


        if (note) {

            message +=
                `Catatan: ${note}%0A`;

        }


        message +=
            `%0A*DETAIL ORDER*%0A`;


        let total = 0;


        cart.forEach(item => {

            const subtotal =
                item.product.price *
                item.quantity;


            total += subtotal;


            message +=
                `• ${item.product.name} | Size ${item.size} | Qty ${item.quantity} | ${formatPrice(subtotal)}%0A`;

        });


        message +=
            `%0A*TOTAL: ${formatPrice(total)}*`;


        const whatsappURL =
            `https://wa.me/${STORE_CONFIG.whatsapp}?text=${message}`;


        window.open(
            whatsappURL,
            "_blank"
        );


        showToast(
            "Order dibuka melalui WhatsApp."
        );

    }
);


/* =========================================
   CONTACT FORM → EMAIL
========================================= */

contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "name"
                )
                .value
                .trim();


        const email =
            document
                .getElementById(
                    "email"
                )
                .value
                .trim();


        const phone =
            document
                .getElementById(
                    "phone"
                )
                .value
                .trim();


        const message =
            document
                .getElementById(
                    "message"
                )
                .value
                .trim();


        const subject =
            encodeURIComponent(
                `Pesan Website DELFRONTDEV dari ${name}`
            );


        const body =
            encodeURIComponent(

                `Halo DELFRONTDEV,

Saya ${name} ingin menghubungi Anda.

Email:
${email}

Nomor WhatsApp:
${phone}

Pesan:
${message}

Terima kasih.`
            );

        window.location.href =
            `mailto:${STORE_CONFIG.email}?subject=${subject}&body=${body}`;

        showToast(
            "Membuka aplikasi email..."
        );
    }
);

/* =========================================
   FAQ
========================================= */

document
    .querySelectorAll(
        ".faq-question"
    )
    .forEach(button => {
        button.addEventListener(
            "click",
            () => {
                const currentItem =
                    button.parentElement;

                document
                    .querySelectorAll(
                        ".faq-item"
                    )
                    .forEach(item => {
                        if (
                            item !==
                            currentItem
                        ) {
                            item.classList.remove(
                                "active"
                            );
                            item.querySelector(
                                ".faq-answer"
                            ).style.maxHeight =
                                null;
                        }
                    });

                currentItem.classList.toggle(
                    "active"
                );
                const answer =
                    currentItem.querySelector(
                        ".faq-answer"
                    );
                if (
                    currentItem.classList.contains(
                        "active"
                    )
                ) {
                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";
                } else {
                    answer.style.maxHeight =
                        null;
                }
            }
        );
    });

/* =========================================
   TOAST
========================================= */

let toastTimeout;

function showToast(
    message
) {
    toastMessage.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimeout
    );

    toastTimeout =
        setTimeout(
            () => {
                toast.classList.remove(
                    "show"
                );
            },
            3000
        );
}

/* =========================================
   BACK TO TOP
========================================= */

backToTop.addEventListener(
    "click",
    () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);

/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {
            closeSearchOverlay();
            closeProductModalFunction();
            closeCart();
            checkoutModal.classList.remove(
                "active"
            );
            document.body.classList.remove(
                "no-scroll"
            );
        }
    }
);

/* =========================================
   ACTIVE NAV ON SCROLL
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

window.addEventListener(
    "scroll",
    () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop =
                section.offsetTop - 200;

            if (
                window.scrollY >=
                sectionTop
            ) {
                current =
                    section.getAttribute(
                        "id"
                    );
                }
        });

        document
            .querySelectorAll(
                ".nav-link"
            )
            .forEach(link => {
                link.classList.remove(
                    "active"
                );

                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    `#${current}`
                ) {
                    link.classList.add(
                        "active"
                    );
                }
            });
    }
);

/* =========================================
   INITIALIZE
========================================= */

renderProducts();

updateCart();