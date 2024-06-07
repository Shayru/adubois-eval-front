import Products from "../component/Products.jsx";
import HeaderUser from "../component/Header/HeaderUser.jsx";
import Checkout from "../component/Checkout.jsx";
import Payment from "../component/Payment.jsx";

const ProductsPage = () => {
    return (
        <>
            <HeaderUser/>
            <br/>
            <br/>
            <Payment/>
        </>
    );
};

export default ProductsPage;