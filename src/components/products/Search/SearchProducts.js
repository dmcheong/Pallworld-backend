import React, { useState } from 'react';
import axios from 'axios';

const SearchProducts = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setError("La recherche ne peut pas être vide");
            return;
        }
        axios.get(`http://localhost:3005/api/products/search?query=${query}`)
            .then(response => {
                setResults(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('Erreur lors de la recherche des produits:', error);
                setError("Erreur lors de la recherche des produits");
            });
    };

    return (
        <div className="page-container">
            <h2>Recherche de produits</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Rechercher un produit"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Rechercher</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {results.length > 0 ? (
                    results.map(product => (
                        <li key={product._id}>{product.name} - {product.price} €</li>
                    ))
                ) : (
                    <p>Aucun produit trouvé.</p>
                )}
            </ul>
        </div>
    );
};

export default SearchProducts;
