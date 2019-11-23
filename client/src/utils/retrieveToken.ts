import jwt from 'jsonwebtoken';

const retrieveToken = () => {
    try {
    let storedToken = localStorage.getItem('token');
    if (!storedToken) return false;
    let decoded = jwt.decode(storedToken);
    if(new Date(decoded.exp * 1000) - Date.now()) {
        
    }
    return true;
        
    } catch (error) {
        
    }
};

export default retrieveToken;
