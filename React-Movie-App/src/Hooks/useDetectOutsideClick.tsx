import { useState, useEffect } from "react";

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} ref
 * @param {boolean} initialState
 */
export const useDetectOutsideClick = (
	ref: React.MutableRefObject<any>,
	initialState: boolean
) => {
	const [isActive, setIsActive] = useState(initialState);

	useEffect(() => {
		const onClick = (e: { target: any }) => {
			// If the active element exists and is clicked outside of
			if (ref.current !== null && !ref.current.contains(e.target)) {
				setIsActive(!isActive);
			}
		};

		// If the item is active (ie open) then listen for clicks outside
		if (isActive) {
			document.addEventListener("click", onClick);
			document.addEventListener("touchstart", onClick);
		}

		return () => {
			document.removeEventListener("click", onClick);
			document.removeEventListener("touchstart", onClick);
		};
	}, [isActive, ref]);

	return [isActive, setIsActive];
};
