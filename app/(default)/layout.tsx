import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-main">
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
}