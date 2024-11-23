import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderOnline = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  
  const menuCategories = {
    specials: [
      {
        id: 1,
        title: "Greek salad",
        price: 12.99,
        description: "Fresh Greek salad with feta cheese, crispy lettuce, cherry tomatoes, cucumber, olives, and our house-made dressing",
        image: "/api/placeholder/200/200"
      },
      {
        id: 2,
        title: "Bruschetta",
        price: 10.99,
        description: "Classic Italian appetizer with grilled bread topped with fresh tomatoes, garlic, basil, and extra virgin olive oil",
        image: "/api/placeholder/200/200"
      },
      {
        id: 3,
        title: "Lemon Dessert",
        price: 8.99,
        description: "Sweet and tangy lemon dessert with a buttery crust and fresh whipped cream",
        image: "/api/placeholder/200/200"
      }
    ],
    mainCourse: [
      {
        id: 4,
        title: "Grilled Fish",
        price: 24.99,
        description: "Fresh catch of the day served with seasonal vegetables",
        image: "/api/placeholder/200/200"
      },
      {
        id: 5,
        title: "Mediterranean Pasta",
        price: 18.99,
        description: "Homemade pasta with fresh Mediterranean ingredients",
        image: "/api/placeholder/200/200"
      }
    ]
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Here you would typically integrate with a payment system
    alert('Proceeding to checkout...');
    // navigate('/checkout', { state: { cart: cart, total: getTotalPrice() } });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Online Menu</h1>
        <p className="text-gray-600">Order your favorite dishes for delivery or pickup</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Menu Section */}
        <div className="md:col-span-2 space-y-8">
          {Object.entries(menuCategories).map(([category, items]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <span className="font-medium text-lg">${item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                      <button 
                        onClick={() => addToCart(item)}
                        className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm hover:bg-yellow-600 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div className="md:sticky md:top-4 h-fit">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col p-3 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">${item.price}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border rounded-full"
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                  <button 
                    className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOnline;