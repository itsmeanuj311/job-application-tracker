"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ImageTabs() {
    const [activeTab, setActiveTab] = useState("organize");

  return (
    <div>
      {/* Hero Images Section with tabs */}
        <section className="border-t bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto px-4">
              {/* Tabs */}
              <div className="flex gap-2 justify-center mb-8">
                <Button
                  onClick={() => setActiveTab("organize")}
                  className={`roundedlg px-6 text-sm font-medium transition-colors ${
                    activeTab === "organize"
                      ? "bg-primary"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Organize Application
                </Button>
                <Button
                  onClick={() => setActiveTab("hired")}
                  className={`roundedlg px-6 text-sm font-medium transition-colors ${
                    activeTab === "hired"
                      ? "bg-primary"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Get Hired
                </Button>
                <Button
                  onClick={() => setActiveTab("boards")}
                  className={`roundedlg px-6 text-sm font-medium transition-colors ${
                    activeTab === "boards"
                      ? "bg-primary"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Manage Boards
                </Button>
              </div>
              <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                {activeTab === "organize" && (
                  <Image
                    src="/hero-images/hero1.png"
                    alt="Organize Application"
                    width={1200}
                    height={800}
                  />
                )}

                {activeTab === "hired" && (
                  <Image
                    src="/hero-images/hero2.png"
                    alt="Get Hired"
                    width={1200}
                    height={800}
                  />
                )}

                {activeTab === "boards" && (
                  <Image
                    src="/hero-images/hero3.png"
                    alt="Manage Boards"
                    width={1200}
                    height={800}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
