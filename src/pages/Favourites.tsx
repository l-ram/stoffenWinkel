import { useEffect } from "react";
import ReactGA from "react-ga4";
const Favourites = () => {
  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);
  return <div>Favourites Coming soon</div>;
};

export default Favourites;
