export interface TabsProps {
  tabs: {
    id: string;
    icon?: React.ReactNode;
    label: string;
    content: React.ReactNode;
  }[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  style?: React.CSSProperties;
  onTabClose?: (tabId: string) => void;
  onTabAdd?: () => void;
  onTabDragEnd?: (sourceId: string, destinationId: string) => void
  onTabDragStart?: (tabId: string) => void;
  onTabDrop?: (tabId: string) => void;
  onTabContextMenu?: (tabId: string, event: React.MouseEvent) => void;
  onTabMouseEnter?: (tabId: string) => void;
  onTabMouseLeave?: (tabId: string) => void;
  onTabFocus?: (tabId: string) => void;
  onTabBlur?: (tabId: string) => void;
  onTabKeyDown?: (tabId: string, event: React.KeyboardEvent) => void;
  onTabClick?: (tabId: string, event: React.MouseEvent) => void;
  onTabDoubleClick?: (tabId: string, event: React.MouseEvent) => void;
  onTabMouseDown?: (tabId: string, event: React.MouseEvent) => void;
  onTabMouseUp?: (tabId: string, event: React.MouseEvent) => void;
  onTabMouseMove?: (tabId: string, event: React.MouseEvent) => void;
  onTabMouseOut?: (tabId: string, event: React.MouseEvent) => void;
  onTabMouseOver?: (tabId: string, event: React.MouseEvent) => void;
  onTabMouseWheel?: (tabId: string, event: React.WheelEvent) => void;
  onTabTouchStart?: (tabId: string, event: React.TouchEvent) => void;
  onTabTouchEnd?: (tabId: string, event: React.TouchEvent) => void;
  onTabTouchMove?: (tabId: string, event: React.TouchEvent) => void;
  onTabTouchCancel?: (tabId: string, event: React.TouchEvent) => void;
  onTabDragStartCapture?: (tabId: string, event: React.DragEvent) => void;
  onTabDragEndCapture?: (tabId: string, event: React.DragEvent) => void;
  onTabDragOver?: (tabId: string, event: React.DragEvent) => void;
  onTabDragLeave?: (tabId: string, event: React.DragEvent) => void;
  onTabDragEnter?: (tabId: string, event: React.DragEvent) => void;
  onTabDropCapture?: (tabId: string, event: React.DragEvent) => void;
  onTabDrag?: (tabId: string, event: React.DragEvent) => void;
  onTabDragCapture?: (tabId: string, event: React.DragEvent)  => void;
}