import React, { useState, useEffect } from 'react'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel';
import { Link } from "react-router-dom";
import './Carosual.css'

export const Carousal = () => {
   const [trending, setTrending] = useState([])
    const { currency, symbol  } = CryptoState();
    
    const fetchTrendingCoins = async() => {
        const response = await fetch(TrendingCoins(currency))
        
        if(!response.ok) {
            const message = `An error has occured: ${response.status}`; 
            throw new Error(message);
        }

        const data = await response.json()

        setTrending(data);
         
    };

    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const items = trending.map((coin) => {
        let profit = coin?.price_change_24h >= 0;
        
      return (
          <Link className='carousel-item'  to={`/coins/${coin.id}`}>
               <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
            <span>
                {coin?.symbol}
                &nbsp;
            </span>
            <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
          <span>
              {symbol}{coin?.current_price}
          </span>
          </Link>
      )
    });

    const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
      };

    return (
        <div className='carousel'>
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={3000}
                disableDotsControls
                disableButtonsControls
                autoPlay
                responsive={responsive}
                items={items}
            />
        </div>
    )
}
