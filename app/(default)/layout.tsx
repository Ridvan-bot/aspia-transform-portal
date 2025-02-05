import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-main">
      <div className="flex-grow container mx-auto mt-10 mb-20">
        {children}
      </div>
      <Footer />
    </div>
  );
}