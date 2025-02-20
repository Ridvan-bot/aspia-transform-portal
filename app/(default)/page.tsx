import Home from "../../components/home";
import Convert from "@/components/convert";


export const metadata = {
  title: "Transform Portal",
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