import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AiAssistant from "./components/AiAssistant/AiAssistant";

const Layout = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="border min-w-full h-full bg-white "
    >
      <ResizablePanel defaultSize={5} maxSize={15}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Navigation</span>
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
