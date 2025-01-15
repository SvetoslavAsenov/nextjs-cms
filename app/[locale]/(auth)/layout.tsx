import bgImage from "@/assets/images/login-bg.jpeg";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Image
        src={bgImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute top-0 left-0"
      />
      {children}
    </div>
  );
};

export default Layout;
