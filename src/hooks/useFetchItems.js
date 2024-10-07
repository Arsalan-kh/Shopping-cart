import { useState, useEffect } from 'react';
import { fetchCategories } from '../utils/api';

const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                // Initialize isChecked to false for each item
                const initializedCategories = data.data.map((category) => ({
                    ...category,
                    items: category.items.map((item) => ({ ...item, isChecked: false })),
                }));
                setCategories(initializedCategories);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, []);

    return { categories, setCategories, loading, error };
};

export default useFetchCategories;
