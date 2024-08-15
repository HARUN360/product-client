import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    // const cart = useLoaderData()





    // pagination start
    const [itemsPerPages, setItemsPerPages] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    // const {count} = useLoaderData();
    // const count = 76;
    // console.log('totalCount', count);
    
    const numberOfPages = Math.ceil(count / itemsPerPages);

    // const pages = []
    // for(let i = 0; i<numberOfPages; i++){
    //     pages.push(i)
    // }
    // console.log(pages);

    const pages = [...Array(numberOfPages).keys()];
    // console.log(pages);

    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPages(val);
        setCurrentPage(0)

    }

    const handlePrevicePage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if(currentPage < pages.length - 1){
            setCurrentPage(currentPage + 1)
        }
    }
// pagination end



useEffect(()=>{
    fetch('http://localhost:5000/productsCount')
    .then(res => res.json())
    .then(data => setCount(data.count))
},[])



    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemsPerPages}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, itemsPerPages]);



    // const handleAddToCart = (product) => {
    //     // cart.push(product); '
    //     let newCart = [];
    
    //     const exists = cart.find(pd => pd._id === product._id);
    //     if (!exists) {
    //         product.quantity = 1;
    //         newCart = [...cart, product]
    //     }
    //     else {
    //         exists.quantity = exists.quantity + 1;
    //         const remaining = cart.filter(pd => pd._id !== product._id);
    //         newCart = [...remaining, exists];
    //     }

    //     setCart(newCart);
    //     addToDb(product._id)
    // }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        // handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            {/* <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div> */}
            <div className='pagination'>
                <p>currnt page: {currentPage}</p>
                <button onClick={handlePrevicePage} className='btn'>previce</button>
                {
                    pages.map(page => <button
                    className={currentPage === page ? 'selected' : undefined}
                        onClick={()=> setCurrentPage(page)}
                        key={page}> {page}</button>)
                }
                <button onClick={handleNextPage} className='btn'>next</button>
                <select value={itemsPerPages} onChange={handleItemsPerPage} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;