import { useState } from "react";
import {
  X,
  Sparkles,
  Clock,
  Plus,
  Trash2,
  Wand2,
  ChevronDown,
} from "lucide-react";

export default function CampaignBuilder({ onClose }: { onClose: () => void }) {
  const [steps, setSteps] = useState([
    { id: 1, title: "Initial Outreach", delay: "Day 0", aiGenerated: true },
  ]);

  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: steps.length + 1,
        title: `Step ${steps.length + 1}`,
        delay: `Day ${steps.length * 3}`,
        aiGenerated: true,
      },
    ]);
  };

  const removeStep = (id: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div className="bg-background rounded-xl border border-border w-[640px] max-h-[80vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-primary rounded-md size-7">
              <Sparkles className="size-3 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-headings font-semibold text-foreground text-[16px]">
                New Campaign
              </h2>
              <p className="text-muted-foreground text-[12px]">
                AI-powered outreach sequence builder
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-5">
            <label className="text-foreground text-[13px] font-medium mb-1.5 block">
              Campaign Name
            </label>
            <input
              type="text"
              placeholder="e.g., Q1 SaaS Outreach"
              className="w-full bg-input border border-border rounded-md px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
            />
          </div>
          <div className="mb-5">
            <label className="text-foreground text-[13px] font-medium mb-1.5 block">
              Target Audience
            </label>
            <div className="flex items-center gap-2 bg-input border border-border rounded-md px-3 py-2">
              <span className="text-muted-foreground text-[13px]">
                Select from Data Hub...
              </span>
              <ChevronDown className="size-3 text-muted-foreground ml-auto" />
            </div>
          </div>
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-foreground text-[13px] font-medium">
                Sequence Steps
              </label>
              <button
                onClick={addStep}
                className="flex items-center gap-1.5 text-primary text-[12px] font-medium"
              >
                <Plus className="size-3" />
                Add Step
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="bg-sidebar border border-border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center bg-primary rounded-full size-6">
                        <span className="text-primary-foreground text-[11px] font-bold">
                          {step.id}
                        </span>
                      </div>
                      <input
                        type="text"
                        defaultValue={step.title}
                        className="bg-transparent text-foreground text-[13px] font-medium outline-none w-[200px]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      {step.aiGenerated && (
                        <span className="flex items-center gap-1 bg-secondary text-primary text-[10px] font-medium rounded-full px-2 py-0.5">
                          <Wand2 className="size-2.5" />
                          AI Generated
                        </span>
                      )}
                      {steps.length > 1 && (
                        <button
                          onClick={() => removeStep(step.id)}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-input border border-border rounded-md px-2 py-1.5">
                      <Clock className="size-3 text-muted-foreground" />
                      <span className="text-[12px] text-foreground">
                        {step.delay}
                      </span>
                    </div>
                    <div className="flex-1 bg-input border border-border rounded-md px-2 py-1.5">
                      <span className="text-[12px] text-muted-foreground">
                        Email subject & body...
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
            <Sparkles className="size-4 text-primary flex-shrink-0" />
            <span className="text-[12px] text-foreground">
              AI will generate personalized messages for each step based on your
              target audience and campaign goals.
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-4 py-2 text-[13px] font-medium">
            <Sparkles className="size-3.5" />
            Generate & Launch
          </button>
        </div>
      </div>
    </div>
  );
}
