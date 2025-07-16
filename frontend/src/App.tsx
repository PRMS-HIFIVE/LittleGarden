import GlobalStyle from "@/styles/globalStyles";
import AppRouter from "@/router/router"; 
import useSidebarStore from "@/store/sidebarStore";
import Sidebar from "@/common/Sidebar/Sidebar";

function App() {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  return (
    <>
      <GlobalStyle />
      <div style={{ maxWidth: '393px', margin: '0 auto', position: 'relative' }}>
        {isSidebarOpen && <Sidebar />}
      </div>
      <AppRouter/>
    </>
  );
}

export default App;
