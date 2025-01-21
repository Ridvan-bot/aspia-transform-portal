import Home from "../../components/home";
import Convert from "../../components/convert";


export const metadata = {
  title: "Automation Portal",
  description: "Home of the Automation Portal",
};

export default function HomePage() {
  return (
    <>
      <Home />
      <Convert />
    </>
  );
}