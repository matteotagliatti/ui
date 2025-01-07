"use client";

import * as React from "react";
import { Plus, Upload } from "lucide-react";
import {
  FloatingActionPanelRoot,
  FloatingActionPanelTrigger,
  FloatingActionPanelContent,
  FloatingActionPanelButton,
} from "@/components/ui/floating-action-panel";

export default function FloatingActionPanelSimple() {
  return (
    <div className="h-[240px] flex items-center justify-center">
      <FloatingActionPanelRoot>
        {({ mode }) => (
          <>
            <FloatingActionPanelTrigger title="Quick Actions" mode="actions">
              Quick Actions
            </FloatingActionPanelTrigger>

            <FloatingActionPanelContent>
              <div className="space-y-1 p-2">
                <FloatingActionPanelButton
                  onClick={() => console.log("New File")}
                >
                  <Plus className="h-4 w-4" />
                  New File
                </FloatingActionPanelButton>
                <FloatingActionPanelButton
                  onClick={() => console.log("Upload")}
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </FloatingActionPanelButton>
              </div>
            </FloatingActionPanelContent>
          </>
        )}
      </FloatingActionPanelRoot>
    </div>
  );
}
