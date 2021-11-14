import React, 
{ 
    createContext, 
    useContext, 
    useState, 
    useEffect } from 'react'

export const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("$")


    useEffect(() => {
        switch(currency) {
            case "USD":
                setSymbol("$"); 
                break;
            case "JPY": 
                setSymbol("¥")
                break;
            default:
                    setSymbol("$")
        }
    }, [currency])
    return (
       <Crypto.Provider value={{ currency, setCurrency, symbol }}>
            {children}
       </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return (
        useContext(Crypto)
        );
}