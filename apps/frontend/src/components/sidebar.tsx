"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IconBox, IconMenu2, IconX } from "@tabler/icons-react";

const MENU_ITEMS = [
  {
    title: "Produtos",
    href: "/produtos",
    icon: IconBox,
  },
];
export function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">dt</span>
          </div>
          <h1 className="font-semibold text-gray-800">Desafio Técnico</h1>
        </div>
      </div>

      <div className="flex-1 py-4 px-3 flex flex-col justify-between overflow-y-auto">
        <nav className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname.includes(item.href);
            const Icon = item.icon;

            return (
              <Link href={item.href} key={item.href} className="block">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start py-3 px-4 text-base font-medium rounded-lg",
                    isActive
                      ? "bg-green-50 text-green-700 hover:bg-green-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "text-green-700" : "text-gray-500"
                    )}
                  />
                  <span>{item.title}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-5 bg-green-600 rounded-full"></div>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:hidden z-30">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
        <div className="ml-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">dt</span>
            </div>
            <h1 className="font-semibold text-gray-800 text-sm">
              Desafio Técnico
            </h1>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className="hidden lg:flex lg:flex-col h-screen w-64 fixed left-0 top-0 bg-white 
                    border-r border-gray-200 z-20"
      >
        {sidebarContent}
      </div>

      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>

      <div className="hidden lg:block w-64 flex-shrink-0"></div>
    </>
  );
}
