import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import CartItem from '../../components/CartItem/CartItem'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import './Cart.scss'

const Cart = (props) => {

    const { onFetchCart, token } = props;
    useEffect(() => {
        onFetchCart(token)
    }, [onFetchCart, token])

    const cartDeleteProductHandler = (token, productId) => {
        props.onCartDeleteProduct(token, productId)
    }

    let cartItems = <Spinner />
    if (!props.loading) {
        let cannotPlaceOeder = true
        cartItems =
            <>
                <ul className="CartItemList">
                    {props.cartItems.map(product => {
                        // console.log('deletedAt:', product.deletedAt)
                        if (product.deletedAt === null) {
                            cannotPlaceOeder = false
                        }
                        return <CartItem
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            available={product.deletedAt === null}
                            quantity={product.cartItem.quantity}
                            price={product.price}
                            cartDeleteProduct={() => cartDeleteProductHandler(token, product.id)}
                        />
                    })}
                </ul>

                {cannotPlaceOeder ? null : <Button to={`/checkout`} btnType="Default">Checkout</Button>}
            </>
    }

    return (
        <>
            <h1>Cart Page</h1>
            {cartItems}
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.shop.loading,
        token: state.auth.token,
        cartItems: state.shop.cartItems,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCart: (token) => dispatch(actions.fetchCart(token)),
        onCartDeleteProduct: (token, productId) => dispatch(actions.cartDeleteProduct(token, productId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)