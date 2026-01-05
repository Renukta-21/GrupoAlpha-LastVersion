import apiInstance from "../apiInstance";

export const fetchCategories = async () => {
    const response = await apiInstance.get('/categories');
    const cats = response.data;

    const subRequests = cats.map(c =>
        apiInstance.get(`/categories/${c.id}`).then(r => r.data)
    );

    const subcategories = await Promise.all(subRequests);

    const finalData = cats.map((cat, index) => ({
        ...cat,
        subcategorias: subcategories[index]
    }));

    return finalData
    /* console.log(finalData); */
};