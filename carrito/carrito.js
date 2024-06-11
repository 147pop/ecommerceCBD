const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});


const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}

  
	if (e.target.classList.contains('icon-trash')) {
		// Obtener el título del producto desde el contenedor padre
		const productContainer = e.target.closest('.info-cart-product');
		const title = productContainer.querySelector('.titulo-producto-carrito').textContent;
	
		// Actualizar la cantidad del producto o eliminarlo si la cantidad es 1
		allProducts = allProducts.map(product => {
			if (product.title === title) {
				product.quantity--;
			}
			return product;
		}).filter(product => product.quantity > 0); // Solo conservar productos con cantidad mayor a 0
	
		// Actualizar la visualización del carrito
		showHTML();
	}
});



// Función para mostrar el HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}x</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
                <img src="C:\\Users\\agus\\Desktop\\proyecto\\img\\basurero.png" alt="basurero" class="icon-trash">
            </div>
        `;

		rowProduct.append(containerProduct);

		total = total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};

// Añadiendo evento de escucha para eliminar productos
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const title = e.target.parentElement.querySelector('.titulo-producto-carrito').textContent;

		allProducts = allProducts.filter(product => product.title !== title);

		showHTML(); // Actualizar el HTML después de eliminar un producto
	}
});
