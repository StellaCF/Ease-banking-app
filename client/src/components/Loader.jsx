import PropTypes from "prop-types";
import RingLoader from "react-spinners/RingLoader";

export default function Loader({ loading, inline = false, size = 20 }) {
  if (!loading) return null;

  const style = inline
    ? { display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }
    : {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fff8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      };

  return (
    <div style={style}>
      <RingLoader
        color="#02487F"
        loading={loading}
        size={size}
        speedMultiplier={1}
      />
    </div>
  );
}

Loader.propTypes = {
   loading: PropTypes.bool.isRequired,
   inline: PropTypes.bool,
   size: PropTypes.number,
 };