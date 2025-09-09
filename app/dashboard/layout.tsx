import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen h-[1px]">
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        <div className="flex h-full  ">
          <div className="h-full ">
            <Sidebar />
          </div>

          <div className="container mx-auto overflow-auto">
            <div className="flex-1 h-full px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
