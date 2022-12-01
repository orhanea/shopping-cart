import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToTheCard } from "../specifications/cartSection";
import { useGetProductsQuery } from "../specifications/productsApi";

const Home = () => {

  const { data, error, isLoading } = useGetProductsQuery();

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleCart = ( product ) => {
    dispatch( addToTheCard( product ) );
    history( "/cart" );
  };

  return (
    <div className="container-for-home">
       { isLoading ? ( // Check status of the data.
          <p> Loading... </p>
       )  : error ? (
          <p> There is an error... </p>
        ) : (
          <>
            <h2> Products </h2>
            <div className="products">
              { data?.map( ( product ) => ( 
                <div key = { product.id } className="product">
                  <h3>{ product.name }</h3>
                  <img src={ product.image } alt={ product.name } />
                  <div className="details">
                    <span>{ product.desc }</span>
                    <span className="price">${ product.price }</span>
                  </div>  
                  <button onClick={ () => handleCart( product )}>
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  );
};

export default Home;