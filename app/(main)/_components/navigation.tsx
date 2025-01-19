'use client';

import { cn } from '@/lib/utils';
import { ChevronsLeft, MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export default function Navigation() {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isRezisingRef = useRef(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isRezisingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isRezisingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navRef.current.style.setProperty('left', `${newWidth}px`);
      navRef.current.style.setProperty('width', `calc(100% - ${newWidth}`);
    }
  };

  const handleMouseUp = () => {
    isRezisingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px'
      );
      navRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navRef.current.style.setProperty('width', '100%');
      navRef.current.style.setProperty('left', '0');
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0'
        )}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            'absolute right-2 top-3 size-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600',
            isMobile && 'opacity-100'
          )}
        >
          <ChevronsLeft className="size-6" />
        </div>
        <div>
          <p>Action items</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
        />
      </aside>
      <div
        ref={navRef}
        className={cn(
          'absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'left-0 w-full'
        )}
      >
        <nav className="w-full bg-transparent px-3 py-2">
          {isCollapsed && (
            <MenuIcon role="button" onClick={resetWidth} className="size-6 text-muted-foreground" />
          )}
        </nav>
      </div>
    </>
  );
}
