import { useEffect } from "react";

const useCloseMobileOnResize = (setMobileCollection, setMobileCategory) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileCollection(null);
        setMobileCategory(null);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileCollection, setMobileCategory]);
};

export default useCloseMobileOnResize;
