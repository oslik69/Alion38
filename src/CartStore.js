import { makeAutoObservable } from "mobx";

class CartStore {
    cartItems = [];

    constructor() {
        makeAutoObservable(this);
        this.loadCartFromLocalStorage();
    }

    addToCart(item) {
        const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push({ ...item, quantity: 1 });
        }
        this.saveCartToLocalStorage();
    }

    removeFromCart(itemId) {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.saveCartToLocalStorage();
    }

    decreaseQuantity(itemId) {
        const item = this.cartItems.find(cartItem => cartItem.id === itemId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                this.removeFromCart(itemId);
            }
            this.saveCartToLocalStorage();
        }
    }

    clearCart() {
        this.cartItems = [];
        localStorage.removeItem("cart");
    }

    get totalPrice() {
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    saveCartToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
    }

    loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            this.cartItems = JSON.parse(savedCart);
        }
    }
}

export default CartStore;
