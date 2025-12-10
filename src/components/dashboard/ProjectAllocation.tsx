"use client";

import BasicModal from "../smoothui/basic-modal";
import { Button } from "../ui/button";

import { useState } from "react";

const ProjectAllocation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} variant="default">
        Project Allocation
      </Button>

      <BasicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="md"
        title="Project Allocation"
      >
        <div className="space-y-4">
          <p className="text-foreground/70">
            This is an example of the BasicModal component. You can customize
            the content here.
          </p>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="default">
              Confirm
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default ProjectAllocation;
