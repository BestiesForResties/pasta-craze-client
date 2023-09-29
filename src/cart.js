import React, { useState, useEffect } from 'react';
import fetchAPI from './helpers/fetchApi';
import styles from './cart.module.css';

const endpoint = {
  getCart: '/api/users/{userId}/cart',
  removeItem: '/api/item/{itemId}/remove-item/{userId}',
  closeCart: '/api/cart/{userId}/',
};

const requestMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
};

const params = {
  userId: '1',
  itemId: null,
  category: null,
};

const Cart = ({ selectedItems = [], user }) => {
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');
  const [pickupInfo, setPickupInfo] = useState({
    name: user ? 'MIA' : '',
    phoneNumber: '',
  });

  const getCart = async () => {
    const cart = await fetchAPI({
      method: requestMethod.get,
      endpoint: endpoint.getCart,
      urlParams: params,
    }).catch((error) => {
      console.log(error);
    });
    setCartItems(cart.items);
  };

  const handleRemoveItem = async (id) => {
    params.itemId = id;

    await fetchAPI({
      method: requestMethod.delete,
      endpoint: endpoint.removeItem,
      urlParams: params,
    }).catch((error) => {
      console.log(error);
    });
    getCart();
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = async () => {
    if (selectedPaymentMethod === 'cash') {
      setOrderCompleted(true);
      setCartItems([]);
    } else if (selectedPaymentMethod === 'card') {
      await fetchAPI({
        method: requestMethod.delete,
        endpoint: endpoint.closeCart,
        urlParams: params,
      }).catch((error) => {
        console.log(error);
      });
      setOrderCompleted(true);
      setCartItems([]);
    }
  };

  const togglePaymentMethod = () => {
    setSelectedPaymentMethod((prevMethod) =>
      prevMethod === 'cash' ? 'card' : 'cash'
    );
  };

  useEffect(() => {
    getCart();
  }, []);
  // ...

return (
  <div className={styles.container}>
    <div className={styles.cartContainer}>
      <h1>Shopping Cart</h1>
      <div className={styles.cartItemsContainer}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <span>{item.name}</span>
            <br />
            <span>${item.price.toFixed(2)}</span>
            <br />
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <strong>Total: ${cartTotal.toFixed(2)}</strong>
      </div>
    </div>

    <div className={styles.checkoutContainer}>
      <h2>Payment Method</h2>
      <div className={styles.paymentMethod}>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={selectedPaymentMethod === 'cash'}
            onChange={togglePaymentMethod}
          />
          Cash
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={selectedPaymentMethod === 'card'}
            onChange={togglePaymentMethod}
          />
          Card
        </label>
      </div>

      {selectedPaymentMethod === 'card' && (
        <div>
          <h2>Card Payment</h2>
          <form>
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={(e) =>
                setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
              }
            />
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={paymentInfo.expirationDate}
              onChange={(e) =>
                setPaymentInfo({
                  ...paymentInfo,
                  expirationDate: e.target.value
                })
              }
            />
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={(e) =>
                setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
              }
            />
          </form>
        </div>
      )}

      {selectedPaymentMethod === 'cash' && (
        <div>
          <h2>Pick Up</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={pickupInfo.name}
              onChange={(e) =>
                setPickupInfo({ ...pickupInfo, name: e.target.value })
              }
              disabled={user ? true : false}
            />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={pickupInfo.phoneNumber}
              onChange={(e) =>
                setPickupInfo({
                  ...pickupInfo,
                  phoneNumber: e.target.value
                })
              }
            />
          </form>
        </div>
      )}

      <div className={styles.completeOrder}>
        <button onClick={handleCheckout}>Complete Order</button>
        {orderCompleted && (
          <div className={styles.orderCompleted}>
            <h2>Order Completed</h2>
            <p>Order has been completed. Check SMS for pickup confirmation.</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
        }

export default Cart;