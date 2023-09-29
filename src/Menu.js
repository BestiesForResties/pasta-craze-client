import React, { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import fetchAPI from './helpers/fetchApi';
import { useNavigate } from 'react-router-dom';

const endpoint = {
    getItems: '/api/item/',
    addToCart: '/api/item/{itemId}/add-to-cart/{userId}',
    getCart: '/api/users/{userId}/cart'
}

const requestMethod = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
}

const params = {
    userId: '1',
    itemId: null,
    category: null,
}

const Menu = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const getCart = async () => {
    const cart = await fetchAPI({
      method: requestMethod.get,
      endpoint: endpoint.getCart,
      urlParams: params
      }).catch((error) => {
      console.log(error);
    });
    if (cart.items) {
      setSelectedItems(cart.items);
    }
  };

  const getMenuItems = async () => {
    const items = await fetchAPI({
      method: requestMethod.get,
      endpoint: endpoint.getItems,
      urlParams: params
      }).catch((error) => {
      console.log(error);
    });
    setMenuItems(items);
  };


  const addToCart = async (item) => {
    const itemId = JSON.stringify(item.id);
    if (selectedItems.some(cartItem => JSON.stringify(cartItem.id) === itemId)) {
      console.log('Item already in cart');
      return;
    }
    params.itemId = itemId;
    const items = await fetchAPI({
      method: requestMethod.post,
      endpoint: endpoint.addToCart,
      urlParams: params
      }).then(()=> {
        setSelectedItems([...selectedItems, item]);
      }).catch((error) => {
      console.log(error);
    });
  };

  const goToCheckout = async () => {
    navigate('/cart');
  }

  useEffect(() => {
    getCart()
    getMenuItems()
  },[]);


  return (
    <div className={styles.menuContainer} style={{ backgroundColor: '#f2f2f2' }}>
      <h1>Menu</h1>
      <div className={styles.menuItems}>
        {menuItems.map((item) => (
       <div key={item.id} className={styles.menuItem}>  
        <img src={item.image_url} alt={item.name} className={styles.menuItemImage} />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: ${item.price.toFixed(2)}</p>
        <button className={styles.addToCartButton} onClick={() => addToCart(item)}>
         Add to Cart
         </button>
        </div>
        ))}
      </div>
      <button className={styles.checkoutButton} onClick={goToCheckout}>
        Checkout ({selectedItems.length} items)
      </button>
    </div>
  );
};

export default Menu;