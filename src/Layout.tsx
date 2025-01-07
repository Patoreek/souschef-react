import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AiAssistant from "./components/AiAssistant/AiAssistant";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="border min-w-full h-full bg-white "
    >
      <ResizablePanel defaultSize={5} maxSize={15}>
        <div className="flex h-[100vh] items-center justify-center p-6">
          <SidebarProvider>
            <AppSidebar />
            {/* |<SidebarTrigger /> */}
          </SidebarProvider>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content Section</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={25}>
            <AiAssistant />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Layout;
