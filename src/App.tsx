import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, X, Zap, Box, Circle, Triangle, Square, Hexagon, GripHorizontal, Menu, Settings, HelpCircle, Info, LayoutDashboard, Star, Download, Upload } from 'lucide-react';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';

interface Window {
  id: string;
  title: string;
  icon: React.ElementType;
  isMinimized: boolean;
  isDashboard?: boolean;
  position?: { x: number; y: number };
  zIndex?: number;
}

interface SidebarPanel {
  title: string;
  content: React.ReactNode;
}

function Sidebar({ onRestoreAll, onMinimizeAll, isExpanded, setIsExpanded }: { 
  onRestoreAll: () => void;
  onMinimizeAll: () => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}) {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const menuItems = [
    { title: "لوحة القيادة", color: "from-blue-400 to-blue-600" },
    { title: "إدارة الثلاميذ", color: "from-emerald-400 to-emerald-600" },
    { title: "إدارة الأفواج", color: "from-purple-400 to-purple-600" },
    { title: "الاختبارات النفسية", color: "from-amber-400 to-amber-600" },
    { title: "الأهداف", color: "from-rose-400 to-rose-600" },
    { title: "إدارة التقارير", color: "from-indigo-400 to-indigo-600" },
    { title: "مؤتمر الفيديو", color: "from-teal-400 to-teal-600" },
    { title: "الإعدادات", color: "from-cyan-400 to-cyan-600" }
  ];

  const panels: Record<string, SidebarPanel> = {
    menu: {
      title: "مستشار(ة) التوجيه",
      content: (
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`px-4 py-2 text-sm bg-gradient-to-r ${item.color} bg-clip-text text-transparent hover:bg-white/10 rounded-lg transition-colors arabic-text cursor-pointer font-semibold`}
            >
              {item.title}
            </div>
          ))}
        </div>
      )
    },
    settings: {
      title: "الإعدادات",
      content: (
        <div className="space-y-4">
          <button
            onClick={onRestoreAll}
            className="w-full px-4 py-2 text-sm text-right text-cyan-400 hover:bg-white/10 rounded-lg transition-colors arabic-text"
          >
            استعادة جميع النوافذ
          </button>
          <button
            onClick={onMinimizeAll}
            className="w-full px-4 py-2 text-sm text-right text-cyan-400 hover:bg-white/10 rounded-lg transition-colors arabic-text"
          >
            تصغير جميع النوافذ
          </button>
        </div>
      )
    },
    help: {
      title: "المساعدة",
      content: (
        <div className="space-y-4 text-sm text-cyan-400/90">
          <h3 className="font-semibold arabic-text">اختصارات:</h3>
          <ul className="space-y-2 arabic-text">
            <li>• اسحب وأفلت للتحريك</li>
            <li>• نقر مزدوج للتكبير</li>
            <li>• Échap للتصغير</li>
          </ul>
        </div>
      )
    },
    info: {
      title: "حول",
      content: (
        <div className="space-y-4 text-sm text-cyan-400/90">
          <h3 className="font-semibold arabic-text">مركز التوجيه</h3>
          <p className="arabic-text">الإصدار 1.0.0</p>
          <p className="arabic-text">© 2024 جميع الحقوق محفوظة</p>
        </div>
      )
    }
  };

  return (
    <div 
      className={`fixed right-0 top-0 bottom-[72px] flex transition-all duration-300 z-40
        ${isExpanded ? 'w-52' : 'w-12'}
      `}
    >
      <div className="h-full flex flex-col items-center py-8 bg-gray-900/50 backdrop-blur-sm border-l border-white/10 w-12">
        <button 
          onClick={() => {
            setIsExpanded(!isExpanded);
            setActivePanel(isExpanded ? null : 'menu');
          }}
          className="w-8 h-8 mb-8 rounded-lg flex items-center justify-center text-cyan-400 hover:bg-white/10 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex-1 flex flex-col items-center space-y-4">
          <button 
            onClick={() => setActivePanel(activePanel === 'settings' ? null : 'settings')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
              ${activePanel === 'settings' ? 'bg-white/20 text-cyan-300' : 'text-cyan-400 hover:bg-white/10'}`}
          >
            <Settings className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setActivePanel(activePanel === 'help' ? null : 'help')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
              ${activePanel === 'help' ? 'bg-white/20 text-cyan-300' : 'text-cyan-400 hover:bg-white/10'}`}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setActivePanel(activePanel === 'info' ? null : 'info')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
              ${activePanel === 'info' ? 'bg-white/20 text-cyan-300' : 'text-cyan-400 hover:bg-white/10'}`}
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div 
        className={`h-full bg-gray-900/50 backdrop-blur-sm border-l border-white/10 overflow-hidden transition-all duration-300 rtl-content
          ${isExpanded ? 'w-40' : 'w-0'}
        `}
      >
        {activePanel && panels[activePanel] && (
          <div className="p-3">
            <h2 className="text-base font-semibold text-cyan-400 mb-3 arabic-text">
              {panels[activePanel].title}
            </h2>
            {panels[activePanel].content}
          </div>
        )}
      </div>
    </div>
  );
}

function WindowPanel({ window, onToggleExpand, onClose, onMinimize, isExpanded, isDragging = false, isDraggable = true, sidebarExpanded, style: additionalStyle, onClick }: {
  window: Window;
  onToggleExpand: () => void;
  onClose: () => void;
  onMinimize: () => void;
  isExpanded: boolean;
  isDragging?: boolean;
  isDraggable?: boolean;
  sidebarExpanded: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ 
    id: window.id,
    disabled: !isDraggable || window.isDashboard
  });

  const style = {
    ...additionalStyle,
    ...(transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      transition,
      opacity: isDragging ? 0.5 : 1,
    } : {}),
    zIndex: window.zIndex,
    ...(window.isMinimized ? {} : {
      position: 'absolute',
      top: window.position?.y,
      left: window.position?.x,
      width: '100%',
      height: '100%',
    }),
  };

  const Icon = window.icon;

  if (window.isMinimized) {
    return (
      <div 
        ref={isDraggable ? setNodeRef : undefined}
        style={style}
        {...(isDraggable ? { ...attributes, ...listeners } : {})}
        className="glassmorphism rounded-lg p-2 flex items-center space-x-2 cursor-pointer hover:bg-white/20 rtl-content"
        onClick={() => {
          onMinimize();
          if (onClick) onClick();
        }}
      >
        <Icon className="w-4 h-4 text-cyan-400 ml-2" />
        <span className="text-sm text-cyan-400 arabic-text">{window.title}</span>
      </div>
    );
  }

  return (
    <div 
      ref={isDraggable ? setNodeRef : undefined}
      style={style}
      className={`glassmorphism rounded-lg transition-all duration-300 ease-in-out window-enter rtl-content
        hover:shadow-[0_0_30px_rgba(74,222,255,0.4)] group`}
      onDoubleClick={onToggleExpand}
      onClick={onClick}
    >
      <div className="flex items-center justify-between p-2 sm:p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          {isDraggable && !window.isDashboard && (
            <div {...attributes} {...listeners} className="cursor-move active:cursor-grabbing">
              <GripHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400/50 hover:text-cyan-400" />
            </div>
          )}
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 ml-2" />
          <h2 className="text-sm sm:text-base font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent window-title arabic-text">
            {window.title}
          </h2>
        </div>
        <div className="flex items-center space-x-1 window-controls">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1.5 rounded-full transition-colors hover:bg-red-500/20"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="p-1.5 rounded-full transition-colors hover:bg-white/10"
          >
            {isExpanded ? (
              <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            ) : (
              <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="p-1.5 rounded-full transition-colors hover:bg-white/10"
          >
            <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-64px)] p-4 sm:p-5">
        {/* Empty content area */}
      </div>
    </div>
  );
}

function App() {
  const [windows, setWindows] = useState<Window[]>([
    { id: 'dashboard', title: 'لوحة القيادة', icon: LayoutDashboard, isMinimized: false, isDashboard: true, zIndex: 1, position: { x: 0, y: 0 } },
    { id: 'window1', title: 'إدارة الثلاميذ', icon: Zap, isMinimized: true, zIndex: 2, position: { x: 0, y: 0 } },
    { id: 'window2', title: 'إدارة الأفواج', icon: Box, isMinimized: true, zIndex: 2, position: { x: 0, y: 0 } },
    { id: 'window3', title: 'الاختبارات النفسية', icon: Circle, isMinimized: true, zIndex: 2, position: { x: 0, y: 0 } },
    { id: 'window4', title: 'الأهداف', icon: Triangle, isMinimized: true, zIndex: 2, position: { x: 0, y: 0 } },
    { id: 'window5', title: 'إدارة التقارير', icon: Square, isMinimized: true, zIndex: 2, position: { x: 0, y: 0 } },
    { id: 'window6', title: 'مؤتمر الفيديو', icon: Hexagon, isMinimized: true, zIndex: 2, position: { x: 0, y: 0 } },
    { id: 'window7', title: 'الإعدادات', icon: Star, isMinimized: true, zIndex: 2, position: { x: 0, y: 0 } }
  ]);

  const [expandedWindows, setExpandedWindows] = useState<Record<string, boolean>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(2);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportData = () => {
    const data = {
      windows,
      expandedWindows,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'window-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.windows) {
            setWindows(data.windows);
          }
          if (data.expandedWindows) {
            setExpandedWindows(data.expandedWindows);
          }
        } catch (error) {
          console.error('Error importing data:', error);
        }
      };
      reader.readAsText(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const bringToFront = (windowId: string) => {
    setMaxZIndex(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: maxZIndex + 1 } : w
    ));
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const windowId = event.active.id as string;
    const window = windows.find(w => w.id === windowId);
    if (window && !window.isDashboard) {
      setActiveId(windowId);
      bringToFront(windowId);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
  };

  const toggleWindow = (windowId: string) => {
    setExpandedWindows(prev => ({
      ...prev,
      [windowId]: !prev[windowId]
    }));
    bringToFront(windowId);
  };

  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true, zIndex: 2 } : w
    ));
    setExpandedWindows(prev => {
      const { [windowId]: _, ...rest } = prev;
      return rest;
    });
  };

  const toggleMinimize = (windowId: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        return { ...w, isMinimized: !w.isMinimized, zIndex: !w.isMinimized ? 2 : maxZIndex + 1 };
      } else if (!w.isDashboard && !w.isMinimized) {
        return { ...w, isMinimized: true, zIndex: 2 };
      } else if (w.isDashboard) {
        return { ...w, isMinimized: !w.isMinimized ? false : true };
      }
      return w;
    }));
    
    if (!windows.find(w => w.id === windowId)?.isMinimized) {
      setMaxZIndex(prev => prev + 1);
    }
    
    if (expandedWindows[windowId]) {
      setExpandedWindows(prev => ({
        ...prev,
        [windowId]: false
      }));
    }
  };

  const handleRestoreAll = () => {
    setMaxZIndex(prev => prev + 1);
    setWindows(prev => prev.map(w => ({ ...w, isMinimized: false, zIndex: maxZIndex + 1 })));
  };

  const handleMinimizeAll = () => {
    setWindows(prev => prev.map(w => ({ ...w, isMinimized: true, zIndex: 2 })));
    setExpandedWindows({});
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const expandedWindowId = Object.entries(expandedWindows).find(([, isExpanded]) => isExpanded)?.[0];
        if (expandedWindowId) {
          toggleMinimize(expandedWindowId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedWindows]);

  const activeWindows = windows.filter(w => !w.isMinimized);
  const minimizedWindowsList = windows.filter(w => w.isMinimized);
  const draggedWindow = activeId ? windows.find(w => w.id === activeId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-900 via-blue-900 to-gray-900 p-3 sm:p-4 md:p-6 overflow-hidden">
      <div className={`relative max-w-7xl mx-auto transition-all duration-300 ${sidebarExpanded ? 'pr-52' : 'pr-12'}`}>
        <div className="absolute top-0 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        
        <DndContext 
          sensors={sensors} 
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={activeWindows.map(w => w.id)}>
            <div className="relative h-[calc(100vh-140px)]">
              {activeWindows.map((window) => (
                <WindowPanel
                  key={window.id}
                  window={window}
                  isExpanded={expandedWindows[window.id]}
                  onToggleExpand={() => toggleWindow(window.id)}
                  onClose={() => closeWindow(window.id)}
                  onMinimize={() => toggleMinimize(window.id)}
                  isDragging={activeId === window.id}
                  sidebarExpanded={sidebarExpanded}
                  onClick={() => bringToFront(window.id)}
                />
              ))}
            </div>

            {minimizedWindowsList.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-2 items-center justify-between rtl-content">
                  <div className="flex flex-wrap gap-2 flex-1">
                    {minimizedWindowsList.map((window) => (
                      <WindowPanel
                        key={window.id}
                        window={window}
                        isExpanded={false}
                        onToggleExpand={() => toggleWindow(window.id)}
                        onClose={() => closeWindow(window.id)}
                        onMinimize={() => toggleMinimize(window.id)}
                        isDragging={activeId === window.id}
                        sidebarExpanded={sidebarExpanded}
                        onClick={() => bringToFront(window.id)}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleExportData}
                      className="glassmorphism rounded-lg p-2 flex items-center space-x-2 cursor-pointer hover:bg-white/20 rtl-content"
                    >
                      <Download className="w-4 h-4 text-cyan-400 ml-2" />
                      <span className="text-sm text-cyan-400 arabic-text">تصدير</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImportData}
                      accept=".json"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="glassmorphism rounded-lg p-2 flex items-center space-x-2 cursor-pointer hover:bg-white/20 rtl-content"
                    >
                      <Upload className="w-4 h-4 text-cyan-400 ml-2" />
                      <span className="text-sm text-cyan-400 arabic-text">استيراد</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <DragOverlay>
              {draggedWindow && (
                <WindowPanel
                  window={draggedWindow}
                  isExpanded={expandedWindows[draggedWindow.id]}
                  onToggleExpand={() => {}}
                  onClose={() => {}}
                  onMinimize={() => {}}
                  sidebarExpanded={sidebarExpanded}
                />
              )}
            </DragOverlay>
          </SortableContext>
        </DndContext>

        <Sidebar 
          onRestoreAll={handleRestoreAll}
          onMinimizeAll={handleMinimizeAll}
          isExpanded={sidebarExpanded}
          setIsExpanded={setSidebarExpanded}
        />
      </div>
    </div>
  );
}

export default App;