import { Plus } from "lucide-react";
import "./Tabs.module.css";
import { TabsProps } from "./Tabs.types";

export const Tabs = ({
  tabs,
  activeTabId,
  onTabChange,
  className,
  style,
  onTabClose,
  onTabAdd,
  onTabDragEnd,
  onTabDragStart,
  onTabDrop,
  onTabContextMenu,
  onTabMouseEnter,
  onTabMouseLeave,
  onTabFocus,
  onTabBlur,
  onTabKeyDown,
  onTabClick,
  onTabDoubleClick,
  onTabMouseDown,
  onTabMouseUp,
  onTabMouseMove,
  onTabMouseOut,
  onTabMouseOver,
  onTabMouseWheel,
  onTabTouchStart,
  onTabTouchEnd,
  onTabTouchMove,
  onTabTouchCancel,
  onTabDragStartCapture,
  onTabDragEndCapture,
  onTabDragOver,
  onTabDragLeave,
  onTabDragEnter,
  onTabDropCapture,
  onTabDrag,
  onTabDragCapture,
}: TabsProps) => {
  return (
    <div className={`tabs-container ${className || ""}`} style={style}>
      <div className="tabs-header">
        <div className="tabs-list">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${tab.id === activeTabId ? "active" : ""}`}
              onClick={(e) => {
                onTabChange(tab.id);
                onTabClick?.(tab.id, e);
              }}
              onDoubleClick={(e) => onTabDoubleClick?.(tab.id, e)}
              onMouseEnter={() => onTabMouseEnter?.(tab.id)}
              onMouseLeave={() => onTabMouseLeave?.(tab.id)}
              onFocus={() => onTabFocus?.(tab.id)}
              onBlur={() => onTabBlur?.(tab.id)}
              onKeyDown={(e) => onTabKeyDown?.(tab.id, e)}
              onMouseDown={(e) => onTabMouseDown?.(tab.id, e)}
              onMouseUp={(e) => onTabMouseUp?.(tab.id, e)}
              onMouseMove={(e) => onTabMouseMove?.(tab.id, e)}
              onMouseOut={(e) => onTabMouseOut?.(tab.id, e)}
              onMouseOver={(e) => onTabMouseOver?.(tab.id, e)}
              onWheel={(e) => onTabMouseWheel?.(tab.id, e)}
              onTouchStart={(e) => onTabTouchStart?.(tab.id, e)}
              onTouchEnd={(e) => onTabTouchEnd?.(tab.id, e)}
              onTouchMove={(e) => onTabTouchMove?.(tab.id, e)}
              onTouchCancel={(e) => onTabTouchCancel?.(tab.id, e)}
              onContextMenu={(e) => onTabContextMenu?.(tab.id, e)}
              draggable
              onDragStart={() => onTabDragStart?.(tab.id)}
              onDragEnd={() => onTabDragEnd?.(tab.id, activeTabId)}
              onDrop={() => onTabDrop?.(tab.id)}
              onDragStartCapture={(e) => onTabDragStartCapture?.(tab.id, e)}
              onDragEndCapture={(e) => onTabDragEndCapture?.(tab.id, e)}
              onDragOver={(e) => onTabDragOver?.(tab.id, e)}
              onDragLeave={(e) => onTabDragLeave?.(tab.id, e)}
              onDragEnter={(e) => onTabDragEnter?.(tab.id, e)}
              onDropCapture={(e) => onTabDropCapture?.(tab.id, e)}
              onDrag={(e) => onTabDrag?.(tab.id, e)}
              onDragCapture={(e) => onTabDragCapture?.(tab.id, e)}>
              <div className="flex items-center gap-2">
                {tab.icon && <span className="tab-icon">{tab.icon}</span>}
                <span>{tab.label}</span>
                {onTabClose && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabClose(tab.id);
                    }}>
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {onTabAdd && (
          <button className="tab-add-btn" onClick={onTabAdd}>
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
