import { useEffect } from "react";

const useDetectTabClose = () => {
    
    const handleBeforeUnload = () => {
        debugger
      sessionStorage.setItem("isRefreshed", "true");
    };

    const handleUnload = () => {
        debugger
      setTimeout(() => {
        debugger
        if (sessionStorage.getItem("isRefreshed")) {
            debugger
          sessionStorage.removeItem("isRefreshed"); 
        } else {
            debugger
          console.log("Tab closed! Do cleanup here.");
        }
      }, 0);
    };
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
};

export default useDetectTabClose;