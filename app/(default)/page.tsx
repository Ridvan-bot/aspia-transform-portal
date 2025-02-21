import Home from "../../components/home";
import Convert from "@/components/convert";


export const metadata = {
  title: "Aspia Transform Portal",
  description: "A portal for Transforming data",
};

export default function HomePage() {
  return (
    <>
      <Home />
      <Convert fileContent={[]} />
    </>
  );
}