import { getDesignData } from "@/pages/api/designerApi";

const { useEffect, useState } = require("react");
// Replace with the actual import

const useDesign = (designId) => {
	const [designData, setDesignData] = useState([]);
	const [loading, setLoading] = useState(true);
	console.log("contrtol reached here");
	useEffect(() => {
		const fetchdesignData = async () => {
			try {
				if (designId) {
					const data = await getDesignData({
						design_Id: designId,
					});
					setDesignData(data);
					console.log("designData: ", data);
				}
			} catch (error) {
				console.error("Error fetching design's data", error);
			} finally {
				setLoading(false);
			}
		};

		fetchdesignData();
	}, [designId]); // Include designId in the dependency array to re-run the effect when designId changes

	// Return the state values from the hook
	return [designData, loading];
};

export default useDesign;
