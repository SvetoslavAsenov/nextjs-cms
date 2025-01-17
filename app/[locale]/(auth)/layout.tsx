import bgImage from "@/assets/images/login-bg.jpeg";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Image
        src={bgImage}
        alt="Background"
        fill
        quality={100}
        className="absolute top-0 left-0 object-cover"
      />
      {children}
    </div>
  );
};

export default Layout;
