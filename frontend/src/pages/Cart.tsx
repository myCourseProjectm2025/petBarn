"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, RefreshCw, ChevronLeft } from "lucide-react"
import { Button } from "../Components/ui/Button"

// Sample cart items - in a real app, this would come from a state management system or API
const initialCartItems = [
  {
    id: "1",
    title: "Premium Fish Food",
    brand: "API",
    price: 12.99,
    quantity: 2,
    imgSrc: "/cat1.svg",
  },
  {
    id: "3",
    title: "Premium Dog Food",
    brand: "Royal Canin",
    price: 45.99,
    quantity: 1,
    imgSrc: "/cat3.svg",
  },
  {
    id: "8",
    title: "Cat Dry Food",
    brand: "Purina",
    price: 32.99,
    quantity: 3,
    imgSrc: "/cat2.svg",
  },
]

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate discount (10% if promo applied)
  const discount = promoApplied ? subtotal * 0.1 : 0

  // Calculate shipping (free if subtotal > 50, otherwise $5.99)
  const shipping = subtotal > 50 ? 0 : 5.99

  // Calculate total
  const total = subtotal - discount + shipping

  // Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Apply promo code
  const applyPromoCode = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "pets10") {
        setPromoApplied(true)
      }
      setIsLoading(false)
    }, 1000)
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <ShoppingCart className="mr-2" /> Shopping Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Cart Items ({cartItems.length})</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    <Trash2 size={16} className="mr-1" /> Clear Cart
                  </Button>
                </div>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 bg-muted/20 rounded-md overflow-hidden mr-4 mb-4 sm:mb-0">
                      <img
                        src={item.imgSrc || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <Link to={`/product/${item.id}`} className="font-medium hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                      <div className="text-sm text-muted-foreground">Brand: {item.brand}</div>
                      <div className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-4 sm:mt-0">
                      <div className="flex items-center border rounded-md mr-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </Button>
                        <div className="w-10 text-center">{item.quantity}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <Link to="/shop">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ChevronLeft size={16} className="mr-1" /> Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </div>

              <div className="p-4 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {/* Discount */}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className={promoApplied ? "text-green-600" : ""}>
                    {promoApplied ? `-$${discount.toFixed(2)}` : "$0.00"}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {/* Promo Code */}
                <div className="pt-2 border-t">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button
                      className="rounded-l-none"
                      onClick={applyPromoCode}
                      disabled={promoApplied || promoCode.trim() === "" || isLoading}
                    >
                      {isLoading ? <RefreshCw size={16} className="animate-spin" /> : "Apply"}
                    </Button>
                  </div>
                  {promoApplied && <div className="text-sm text-green-600 mt-1">Promo code applied: 10% discount</div>}
                </div>

                {/* Total */}
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Including taxes</div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full mt-4">
                  Proceed to Checkout <ArrowRight size={16} className="ml-1" />
                </Button>

                {/* Payment Methods */}
                <div className="text-xs text-center text-muted-foreground mt-2">Secure payment methods</div>
                <div className="flex justify-center space-x-2">
                  <img src="/visa.svg" alt="Visa" className="h-6" />
                  <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                  <img src="/paypal.svg" alt="PayPal" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingCart size={32} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/shop">
            <Button>
              Start Shopping <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart

