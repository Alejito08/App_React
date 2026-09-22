// src/components/Layout/Layout.jsx
import Header from "./Header";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex flex-col w-full min-h-screen m-0 p-0 box-border">
      <Header />
      <Navbar />
      <main className="w-full flex-1 flex flex-col items-center justify-center bg-transparent m-0 p-0 box-border">
        {children}
      </main>
    </div>
  );
}

export default Layout;