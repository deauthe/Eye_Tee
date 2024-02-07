import { getDesignerMadeFinalProducts } from "@/pages/api/designerApi";

const { useEffect, useState } = require("react");
// Replace with the actual import

const useDesignerProducts = (designerId) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	console.log("contrtol reached here");
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				if (designerId) {
					const data = await getDesignerMadeFinalProducts({
						designer_id: designerId,
					});
					setProducts(data.products);
					console.log("products: ", data.products);
				}
			} catch (error) {
				console.error("Error fetching designer Data, please check Id:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [designerId]); // Include designerId in the dependency array to re-run the effect when designerId changes

	// Return the state values from the hook
	return [products, loading];
};

export default useDesignerProducts;
