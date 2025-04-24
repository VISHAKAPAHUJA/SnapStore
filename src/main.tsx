// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
const App: React.FC = () => {
const [activeCategory, setActiveCategory] = useState('All');
const [searchQuery, setSearchQuery] = useState('');
const [isCartOpen, setIsCartOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
const [cart, setCart] = useState<CartItem[]>([]);
const [products, setProducts] = useState<Product[]>([]);
const [isLoading, setIsLoading] = useState(true);
// Product interface
interface Product {
id: number;
name: string;
price: number;
category: string;
description: string;
image: string;
}
// Cart item interface
interface CartItem {
product: Product;
quantity: number;
}
// Mock products data
useEffect(() => {
// Simulate loading
setTimeout(() => {
setProducts([
{
id: 1,
name: "Premium Wireless Headphones",
price: 199.99,
category: "Electronics",
description: "Experience immersive sound with these premium noise-cancelling wireless headphones. Perfect for music lovers and professionals alike, featuring 30-hour battery life and ultra-comfortable design.",
image: "https://readdy.ai/api/search-image?query=Premium%20wireless%20headphones%20with%20sleek%20modern%20design%20on%20a%20minimalist%20white%20background%2C%20professional%20product%20photography%20with%20soft%20shadows%2C%20ultra%20high%20definition%2C%20photorealistic%2C%20studio%20lighting&width=400&height=400&seq=1&orientation=squarish"
},
{
id: 2,
name: "Smart Watch Series 5",
price: 299.99,
category: "Electronics",
description: "Track your fitness goals, receive notifications, and more with this advanced smartwatch. Features heart rate monitoring, GPS, and a beautiful retina display.",
image: "https://readdy.ai/api/search-image?query=Modern%20smartwatch%20with%20black%20band%20on%20minimalist%20white%20background%2C%20professional%20product%20photography%20with%20soft%20shadows%2C%20ultra%20high%20definition%2C%20photorealistic%2C%20studio%20lighting&width=400&height=400&seq=2&orientation=squarish"
},
{
id: 3,
name: "Designer Leather Handbag",
price: 149.99,
category: "Fashion",
description: "Elevate your style with this premium leather handbag. Featuring multiple compartments and a luxurious finish, perfect for any occasion.",
image: "https://readdy.ai/api/search-image?query=Luxury%20leather%20handbag%20on%20minimalist%20white%20background%2C%20professional%20product%20photography%20with%20soft%20shadows%2C%20ultra%20high%20definition%2C%20photorealistic%2C%20studio%20lighting&width=400&height=400&seq=3&orientation=squarish"
},
{
id: 4,
name: "Minimalist Coffee Table",
price: 249.99,
category: "Home",
description: "Add a touch of elegance to your living room with this minimalist coffee table. Made from high-quality materials with a sleek design.",
image: "https://readdy.ai/api/search-image?query=Modern%20minimalist%20coffee%20table%20on%20a%20clean%20white%20background%2C%20professional%20product%20photography%20with%20soft%20shadows%2C%20ultra%20high%20definition%2C%20photorealistic%2C%20studio%20lighting&width=400&height=400&seq=4&orientation=squarish"
},
{
id: 5,
name: "Premium Yoga Mat",
price: 59.99,
category: "Sports",
description: "Enhance your yoga practice with this premium non-slip yoga mat. Provides excellent cushioning and support for all types of yoga.",
image: "https://readdy.ai/api/search-image?query=Premium%20yoga%20mat%20rolled%20up%20on%20a%20minimalist%20white%20background%2C%20professional%20product%20photography%20with%20soft%20shadows%2C%20ultra%20high%20definition%2C%20photorealistic%2C%20studio%20lighting&width=400&height=400&seq=5&orientation=squarish"
},
{
id: 6,
name: "Wireless Bluetooth Speaker",
price: 79.99,
category: "Electronics",
description: "Enjoy your favorite music anywhere with this portable Bluetooth speaker. Features 12 hours of battery life and water resistance.",
image: "https://readdy.ai/api/search-image?query=Portable%20bluetooth%20speaker%20on%20minimalist%20white%20background%2C%20professional%20product%20photography%20with%20soft%20shadows%2C%20ultra%20high%20definition%2C%20photorealistic%2C%20studio%20lighting&width=400&height=400&seq=6&orientation=squarish"
},
{
id: 7,
name: "Men's Casual Sneakers",
price: 89.99,
category: "Fashion",
description: "Step out in style with these comfortable casual sneakers. Perfect for everyday wear with a modern design.",
image: "https://readdy.ai/api/search-image?query=Stylish%20men%20casual%20sneakers%20on%20minimalist%20white%20background%2C%20professional%20product%20photography%20with%20soft%20shadows%2C%20ultra%20high%20definition%2C%20photorealistic%2C%20studio%20lighting&width=400&height=400&seq=7&orientation=squarish"
},
{
id: 8,
name: "Scented Candle Set",
price: 39.99,
category: "Home",
description: "Create a relaxing atmosphere with this set of premium scented candles. Includes three different fragrances to suit your mood.",
image: "https://readdy.ai/api/search-image?query=Set%20of%20luxury%20scented%20candles%20on%20minimalist%20white%20background%2C%20professional%20product%20photography%20with%20soft%20shadows%2C%20ultra%20high%20definition%2C%20photorealistic%2C%20studio%20lighting&width=400&height=400&seq=8&orientation=squarish"
}
]);
setIsLoading(false);
}, 1500);
}, []);
// Categories
const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];
// Filter products by category and search query
const filteredProducts = products.filter(product => {
const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
product.description.toLowerCase().includes(searchQuery.toLowerCase());
return matchesCategory && matchesSearch;
});
// Add to cart function
const addToCart = (product: Product, quantity: number = 1) => {
setCart(prevCart => {
const existingItem = prevCart.find(item => item.product.id === product.id);
if (existingItem) {
return prevCart.map(item =>
item.product.id === product.id
? { ...item, quantity: item.quantity + quantity }
: item
);
} else {
return [...prevCart, { product, quantity }];
}
});
// Show success notification
showNotification(`Added ${product.name} to cart`);
};
// Remove from cart function
const removeFromCart = (productId: number) => {
setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
};
// Update cart item quantity
const updateCartItemQuantity = (productId: number, newQuantity: number) => {
if (newQuantity < 1) return;
setCart(prevCart =>
prevCart.map(item =>
item.product.id === productId
? { ...item, quantity: newQuantity }
: item
)
);
};
// Calculate total items in cart
const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
// Calculate cart total
const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
// Notification state
const [notification, setNotification] = useState<{ message: string, visible: boolean }>({
message: '',
visible: false
});
const [showCheckoutForm, setShowCheckoutForm] = useState(false);
const [checkoutData, setCheckoutData] = useState({
name: '',
email: '',
address: '',
});
const [formErrors, setFormErrors] = useState({
name: '',
email: '',
address: '',
});
// Show notification
const showNotification = (message: string) => {
setNotification({ message, visible: true });
setTimeout(() => {
setNotification({ message: '', visible: false });
}, 3000);
};
// Open product modal
const openProductModal = (product: Product) => {
setSelectedProduct(product);
};
// Close product modal
const closeProductModal = () => {
setSelectedProduct(null);
};
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
<header className="sticky top-0 z-50 bg-white shadow-md">
<div className="container mx-auto px-4 py-4 flex items-center justify-between">
<div className="flex items-center">
<h1 className="text-2xl font-bold text-indigo-600">webSnapStore</h1>
</div>
<div className="w-full max-w-md mx-4 relative">
<input
type="text"
placeholder="Search products..."
className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
<i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
</div>
<button
className="relative p-2 !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => setIsCartOpen(true)}
>
<i className="fas fa-shopping-cart text-xl text-gray-700"></i>
{cartItemsCount > 0 && (
<span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
{cartItemsCount}
</span>
)}
</button>
</div>
</header>
{/* Category Navigation */}
<div className="bg-white shadow-sm mb-6">
<div className="container mx-auto px-4 py-3 overflow-x-auto flex items-center space-x-4">
{categories.map(category => (
<button
key={category}
className={`px-4 py-2 rounded-full whitespace-nowrap cursor-pointer !rounded-button ${
activeCategory === category
? 'bg-indigo-600 text-white'
: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
}`}
onClick={() => setActiveCategory(category)}
>
{category}
</button>
))}
</div>
</div>
{/* Main Content */}
<main className="container mx-auto px-4 pb-16">
<h2 className="text-2xl font-semibold mb-6">{activeCategory === 'All' ? 'All Products' : activeCategory}</h2>
{isLoading ? (
// Loading state
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{[...Array(8)].map((_, index) => (
<div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
<div className="h-64 bg-gray-200"></div>
<div className="p-4">
<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
<div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
<div className="h-8 bg-gray-200 rounded w-full"></div>
</div>
</div>
))}
</div>
) : filteredProducts.length === 0 ? (
// No results
<div className="text-center py-12">
<i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
<p className="text-xl text-gray-500">No products found. Try a different search or category.</p>
</div>
) : (
// Product grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{filteredProducts.map(product => (
<div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
<div
className="h-64 overflow-hidden relative cursor-pointer"
onClick={() => openProductModal(product)}
>
<img
src={product.image}
alt={product.name}
className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
/>
<div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100">
<i className="fas fa-eye text-gray-600"></i>
</div>
</div>
<div className="p-4">
<h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
<p className="text-indigo-600 font-bold mb-3">${product.price.toFixed(2)}</p>
<button
className="w-full bg-indigo-600 text-white py-2 rounded transition-colors duration-300 hover:bg-indigo-700 flex items-center justify-center !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => addToCart(product)}
>
<i className="fas fa-shopping-cart mr-2"></i>
Add to Cart
</button>
</div>
</div>
))}
</div>
)}
</main>
{/* Product Modal */}
{selectedProduct && (
<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto animate-fadeIn">
<div className="relative">
<button
className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 !rounded-button cursor-pointer whitespace-nowrap"
onClick={closeProductModal}
>
<i className="fas fa-times text-xl"></i>
</button>
<div className="grid grid-cols-1 md:grid-cols-2">
<div className="p-6 flex items-center justify-center bg-gray-100">
<img
src={selectedProduct.image}
alt={selectedProduct.name}
className="max-h-[400px] object-contain"
/>
</div>
<div className="p-6">
<h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h2>
<p className="text-indigo-600 text-xl font-bold mb-4">${selectedProduct.price.toFixed(2)}</p>
<div className="mb-6">
<h3 className="text-lg font-semibold mb-2">Description</h3>
<p className="text-gray-600">{selectedProduct.description}</p>
</div>
<div className="mb-6">
<h3 className="text-lg font-semibold mb-2">Quantity</h3>
<div className="flex items-center">
<button
className="bg-gray-200 px-3 py-1 rounded-l !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => {
const modalQuantity = document.getElementById('modal-quantity') as HTMLInputElement;
const currentValue = parseInt(modalQuantity.value);
if (currentValue > 1) {
modalQuantity.value = (currentValue - 1).toString();
}
}}
>
<i className="fas fa-minus"></i>
</button>
<input
type="number"
id="modal-quantity"
className="w-16 text-center border-y border-gray-200 py-1 border-none"
defaultValue="1"
min="1"
/>
<button
className="bg-gray-200 px-3 py-1 rounded-r !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => {
const modalQuantity = document.getElementById('modal-quantity') as HTMLInputElement;
const currentValue = parseInt(modalQuantity.value);
modalQuantity.value = (currentValue + 1).toString();
}}
>
<i className="fas fa-plus"></i>
</button>
</div>
</div>
<button
className="w-full bg-indigo-600 text-white py-3 rounded-lg transition-colors duration-300 hover:bg-indigo-700 flex items-center justify-center !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => {
const modalQuantity = document.getElementById('modal-quantity') as HTMLInputElement;
const quantity = parseInt(modalQuantity.value);
addToCart(selectedProduct, quantity);
closeProductModal();
}}
>
<i className="fas fa-shopping-cart mr-2"></i>
Add to Cart
</button>
</div>
</div>
</div>
</div>
</div>
)}
{/* Cart Sidebar */}
<div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
<div className="flex flex-col h-full">
<div className="p-4 border-b border-gray-200 flex items-center justify-between">
<h2 className="text-xl font-bold">Your Cart ({cartItemsCount} items)</h2>
<button
className="text-gray-500 hover:text-gray-700 !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => setIsCartOpen(false)}
>
<i className="fas fa-times text-xl"></i>
</button>
</div>
<div className="flex-grow overflow-y-auto p-4">
{cart.length === 0 ? (
<div className="flex flex-col items-center justify-center h-full text-center">
<i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
<p className="text-gray-500 mb-4">Your cart is empty</p>
<button
className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => setIsCartOpen(false)}
>
Continue Shopping
</button>
</div>
) : (
<div className="space-y-4">
{cart.map(item => (
<div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg animate-fadeIn">
<img
src={item.product.image}
alt={item.product.name}
className="w-16 h-16 object-cover rounded"
/>
<div className="flex-grow">
<h3 className="font-medium">{item.product.name}</h3>
<p className="text-indigo-600 font-bold">${item.product.price.toFixed(2)}</p>
</div>
<div className="flex flex-col items-end">
<div className="flex items-center mb-2">
<button
className="text-gray-500 hover:text-gray-700 px-1 !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
>
<i className="fas fa-minus"></i>
</button>
<span className="mx-2">{item.quantity}</span>
<button
className="text-gray-500 hover:text-gray-700 px-1 !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
>
<i className="fas fa-plus"></i>
</button>
</div>
<button
className="text-red-500 hover:text-red-700 text-sm !rounded-button cursor-pointer whitespace-nowrap"
onClick={() => removeFromCart(item.product.id)}
>
<i className="fas fa-trash mr-1"></i>
Remove
</button>
</div>
</div>
))}
</div>
)}
</div>
{cart.length > 0 && (
<div className="p-4 border-t border-gray-200">
<div className="flex justify-between mb-4">
<span className="font-semibold">Total:</span>
<span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
</div>
<button 
  onClick={() => {
    setIsCartOpen(false);
    setShowCheckoutForm(true);
  }}
  className="w-full bg-indigo-600 text-white py-3 rounded-lg transition-colors duration-300 hover:bg-indigo-700 !rounded-button cursor-pointer whitespace-nowrap">
  Proceed to Checkout
</button>
</div>
)}
</div>
</div>
{/* Notification */}
<div className={`fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 z-50 ${notification.visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
<div className="flex items-center">
<i className="fas fa-check-circle mr-2"></i>
<span>{notification.message}</span>
</div>
</div>
{/* Checkout Form Modal */}
{showCheckoutForm && (
<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn p-6">
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold">Checkout</h2>
<button
onClick={() => setShowCheckoutForm(false)}
className="text-gray-500 hover:text-gray-700 !rounded-button cursor-pointer whitespace-nowrap"
>
<i className="fas fa-times"></i>
</button>
</div>
<form onSubmit={(e) => {
e.preventDefault();
let hasErrors = false;
const errors = {
name: '',
email: '',
address: ''
};

if (!checkoutData.name.trim()) {
errors.name = 'Name is required';
hasErrors = true;
}

if (!checkoutData.email.trim()) {
errors.email = 'Email is required';
hasErrors = true;
} else if (!/\S+@\S+\.\S+/.test(checkoutData.email)) {
errors.email = 'Invalid email format';
hasErrors = true;
}

if (!checkoutData.address.trim()) {
errors.address = 'Address is required';
hasErrors = true;
}

if (hasErrors) {
setFormErrors(errors);
return;
}

// Show success message and reset cart
showNotification('Order placed successfully! Thank you for shopping with us.');
setCart([]);
setShowCheckoutForm(false);
}}>
<div className="space-y-4">
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
<input
type="text"
value={checkoutData.name}
onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
placeholder="Enter your name"
/>
{formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
<input
type="email"
value={checkoutData.email}
onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
placeholder="Enter your email"
/>
{formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
<textarea
value={checkoutData.address}
onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
rows={3}
placeholder="Enter your shipping address"
></textarea>
{formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
</div>
</div>
<div className="mt-6">
<div className="mb-4 p-4 bg-gray-50 rounded-lg">
<div className="flex justify-between mb-2">
<span className="font-medium">Items:</span>
<span>{cartItemsCount}</span>
</div>
<div className="flex justify-between font-bold">
<span>Total:</span>
<span>${cartTotal.toFixed(2)}</span>
</div>
</div>
<button
type="submit"
className="w-full bg-indigo-600 text-white py-3 rounded-lg transition-colors duration-300 hover:bg-indigo-700 !rounded-button cursor-pointer whitespace-nowrap"
>
Place Order
</button>
</div>
</form>
</div>
</div>
)}

{/* Overlay for cart sidebar */}
{isCartOpen && (
<div
className="fixed inset-0 bg-black bg-opacity-50 z-40"
onClick={() => setIsCartOpen(false)}
></div>
)}
<style jsx>{`
@keyframes fadeIn {
from { opacity: 0; transform: translateY(10px); }
to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
animation: fadeIn 0.3s ease-out;
}
/* Hide number input arrows */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}
input[type=number] {
-moz-appearance: textfield;
}
`}</style>
</div>
);
};
export default App
