import Body from "../pages/Landing/Body";
import Footer from "../pages/Landing/Footer";
import Heading from "../pages/Landing/Heading";
import HomePage from "../pages/Logged/HomePage";
export default function Landing() {
  return (
    <div className="scroll-smooth">
      <Heading />
      <HomePage />
      <Body /> <Footer />
    </div>
  );
}
