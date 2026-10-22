"use client";

import { useState } from "react";
import { Sparkles, Building2, Bath, PlusCircle, Wrench, LayoutGrid, Maximize2, Grid2X2, Sofa, Star, CalendarDays, ChevronLeft } from "lucide-react";

// ── Public types ──────────────────────────────────────────────
export interface InquiryAnswers {
  serviceType: string;
  // Q2-Q5: property rooms
  bedrooms?: string;
  bathrooms?: string;
  livingAreas?: string;
  kitchen?: string;
  cupboardTops?: string;
  // Q6: carpet
  carpetCleaning?: string;
  carpetAreas?: string;
  // Q7: windows
  windowCleaning?: string;
  // Q8: appliances
  applianceCleaning?: string;
  appliances?: string;
  // Q9: extra areas
  additionalAreas?: string;
  // Q9a: soft furnishings
  softFurnishings?: string;
  // Q10: furnished
  furnished?: string;
  // Q11: pressure washing
  pressureWashingNeeded?: string;
  pressureWashSurfaces?: string;
  // Q12-Q13
  otherServices?: string;
  propertyCondition?: string;
  // Standalone carpet & upholstery service fields
  carpetedAreas?: string;
  rugCount?: string;
  upholsteryItems?: string;
  stairsHallways?: string;
  // Other standalone service fields
  carpetItems?: string;
  area?: string;
  areaSize?: string;
  additionalInfo?: string;
  premisesType?: string;
  // Date
  preferredDate?: string;
}

interface Props {
  onComplete: (answers: InquiryAnswers) => void;
}

// ── Step shape ────────────────────────────────────────────────
type StepKind = "single" | "multi" | "date" | "text" | "textarea";

interface Step {
  id: keyof InquiryAnswers;
  question: string;
  subtitle?: string;
  placeholder?: string;
  kind: StepKind;
  options: readonly string[];
  icon: React.ReactNode;
}

// ── Icons ─────────────────────────────────────────────────────
const Icon = {
  service: <Sparkles className="w-6 h-6" />,
  property: <Building2 className="w-6 h-6" />,
  bathroom: <Bath className="w-6 h-6" />,
  addons: <PlusCircle className="w-6 h-6" />,
  appliances: <Wrench className="w-6 h-6" />,
  carpet: <LayoutGrid className="w-6 h-6" />,
  area: <Maximize2 className="w-6 h-6" />,
  window: <Grid2X2 className="w-6 h-6" />,
  furnished: <Sofa className="w-6 h-6" />,
  premises: <Building2 className="w-6 h-6" />,
  condition: <Star className="w-6 h-6" />,
  date: <CalendarDays className="w-6 h-6" />,
};

// ── Step definitions ──────────────────────────────────────────

// Q2
const BEDROOMS_STEP: Step = {
  id: "bedrooms",
  question: "What size is the property?",
  kind: "single",
  options: [
  "Studio Flat",
  "1 Bed Flat / House",
  "2 Bed Flat / House",
  "3 Bed Flat / House",
  "4 Bed Flat / House",
  "5 Bed House",
  "6 Bed House",
  "7 Bed House",
  "8+ Bed House",
  ],
  icon: Icon.property,
};

// Q3
const BATHROOMS_STEP: Step = {
  id: "bathrooms",
  question: "How many bathrooms / toilets?",
  subtitle: "If a bathroom and toilet are combined, count it as one.",
  kind: "single",
  options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
  icon: Icon.bathroom,
};

// Q4
const LIVING_AREAS_STEP: Step = {
  id: "livingAreas",
  question: "How many living rooms?",
  kind: "single",
  options: ["1", "2", "3", "4", "5"],
  icon: Icon.property,
};

// Q5
const KITCHEN_STEP: Step = {
  id: "kitchen",
  question: "How many kitchens?",
  kind: "single",
  options: ["1", "2", "3", "4", "5"],
  icon: Icon.premises,
};

// Q5a
const CUPBOARD_TOPS_STEP: Step = {
  id: "cupboardTops",
  question: "Would you like the tops of your kitchen cupboards cleaned?",
  kind: "single",
  options: ["Yes, please", "No, thanks"],
  icon: Icon.premises,
};

// Q6, gate
const CARPET_CLEANING_STEP: Step = {
  id: "carpetCleaning",
  question: "Professional carpet cleaning?",
  kind: "single",
  options: ["Yes please", "No, just hoovering"],
  icon: Icon.carpet,
};

// Q6a, only shown if "Yes please"
const CARPET_AREAS_STEP: Step = {
  id: "carpetAreas",
  question: "How many carpet areas need cleaning?",
  kind: "single",
  options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
  icon: Icon.carpet,
};

// Q7
const WINDOW_CLEANING_STEP: Step = {
  id: "windowCleaning",
  question: "How do you need your windows cleaned?",
  subtitle: "Internal windows is always included but please tell us if you need exterior windows too",
  kind: "single",
  options: ["Internally only", "Internally and Externally"],
  icon: Icon.window,
};

// Q8, gate
const APPLIANCE_CLEANING_STEP: Step = {
  id: "applianceCleaning",
  question: "Do you need appliances cleaned?",
  subtitle: "Oven, washing machine, fridge, etc.",
  kind: "single",
  options: ["Yes", "No"],
  icon: Icon.appliances,
};

// Q8a, only shown if "Yes"
const APPLIANCES_STEP: Step = {
  id: "appliances",
  question: "Which appliances need cleaning?",
  kind: "multi",
  options: [
  "AGA Oven",
  "Dishwasher",
  "Double Oven",
  "Extractor Fan",
  "Freezer",
  "Fridge",
  "Hob & Hood",
  "Range Cooker",
  "Single Oven",
  "Tumble Dryer",
  "Washing Machine",
  ],
  icon: Icon.appliances,
};

// Q9
const ADDITIONAL_AREAS_STEP: Step = {
  id: "additionalAreas",
  question: "Any additional areas to clean?",
  subtitle: "Let us know if you have additional areas",
  kind: "multi",
  options: [
  "Balcony",
  "Box Room",
  "Cloakroom",
  "Conservatory",
  "Dining Room",
  "Garage",
  "Study Room",
  "Utility Room",
  "No thank you",
  ],
  icon: Icon.area,
};

// Q9a
const SOFT_FURNISHINGS_STEP: Step = {
  id: "softFurnishings",
  question: "Do you need any of the following steam cleaned?",
  subtitle: "Select all that apply or skip if none.",
  kind: "multi",
  options: [
  "1 seater sofa",
  "2 seater sofa",
  "3 seater sofa",
  "4 seater sofa",
  "5 seater sofa",
  "Blinds cleaning",
  "Curtain cleaning",
  "L-shape sofa",
  "Mattress cleaning",
  "No, thank you",
  ],
  icon: Icon.furnished,
};

// Q10
const FURNISHED_STEP: Step = {
  id: "furnished",
  question: "Is the property furnished?",
  kind: "single",
  options: ["Yes", "No"],
  icon: Icon.furnished,
};

// Q11, gate
const PRESSURE_WASHING_NEEDED_STEP: Step = {
  id: "pressureWashingNeeded",
  question: "Pressure washing needed?",
  subtitle: "High jet wash for outside areas.",
  kind: "single",
  options: ["Yes", "No"],
  icon: Icon.area,
};

// Q11a, only shown if "Yes"
const PRESSURE_WASH_SURFACES_STEP: Step = {
  id: "pressureWashSurfaces",
  question: "What do you need pressure washed?",
  kind: "multi",
  options: ["Patio", "Driveway", "Garden", "Balcony", "Fences", "Decks", "Pavement", "House Siding", "Walls", "Other"],
  icon: Icon.area,
};

// Q12
const OTHER_SERVICES_STEP: Step = {
  id: "otherServices",
  question: "Do you need help with any of the following?",
  subtitle: "NOTE: You will be sent a separate quote for the service(s) you select here.",
  kind: "multi",
  options: [
  "Need Handyman service",
  "Need help with Clearance / Rubbish Disposal",
  "Need Moving services",
  "No, Thank you",
  ],
  icon: Icon.addons,
};

// Q13
const PROPERTY_CONDITION_STEP: Step = {
  id: "propertyCondition",
  question: "What is the property condition?",
  subtitle: "Helps us select the right team and plan the clean.",
  kind: "single",
  options: ["Quite clean", "Average", "Quite dirty", "Filthy"],
  icon: Icon.condition,
};

// Date, always last
const DATE_STEP: Step = {
  id: "preferredDate",
  question: "When would you like this done?",
  kind: "date",
  options: [],
  icon: Icon.date,
};

// Standalone carpet & upholstery service steps
const CARPETED_AREAS_STEP: Step = {
  id: "carpetedAreas",
  question: "How many carpeted areas need cleaning?",
  subtitle: "Each room or open area counts as one.",
  kind: "single",
  options: ["None", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"],
  icon: Icon.carpet,
};

const RUG_COUNT_STEP: Step = {
  id: "rugCount",
  question: "Any rugs to clean?",
  kind: "single",
  options: ["None", "1", "2", "3", "4", "5+"],
  icon: Icon.carpet,
};

const UPHOLSTERY_ITEMS_STEP: Step = {
  id: "upholsteryItems",
  question: "Any upholstery or sofas to clean?",
  subtitle: "Select all that apply.",
  kind: "multi",
  options: [
  "1 Seater Sofa",
  "2 Seater Sofa",
  "3 Seater Sofa",
  "4 Seater Sofa",
  "L-Shape Sofa",
  "Armchair",
  "Mattress",
  "No, thank you",
  ],
  icon: Icon.furnished,
};

const STAIRS_HALLWAYS_STEP: Step = {
  id: "stairsHallways",
  question: "Any stairs or hallways to clean?",
  kind: "multi",
  options: ["Stairs", "Hallway", "Landing", "No, thank you"],
  icon: Icon.carpet,
};

// Legacy standalone step (kept for other potential uses)
const CARPET_ITEMS_STEP: Step = {
  id: "carpetItems",
  question: "What would you like cleaned?",
  kind: "multi",
  options: [
  "1-Seater Sofa",
  "2-Seater Sofa",
  "3-Seater Sofa",
  "4-Seater Sofa",
  "Blinds",
  "Carpet (per room)",
  "Curtains (per pair)",
  "L-Shape Sofa",
  "Mattress",
  "Rug",
  ],
  icon: Icon.carpet,
};

const AREA_STEP: Step = {
  id: "area",
  question: "Roughly, what is the area size to be pressure washed?",
  subtitle: "Give an estimate, we'll measure on the day if booked.",
  kind: "single",
  options: ["Small (up to 20 m²)", "Medium (20 to 50 m²)", "Large (50 to 100 m²)", "Extra Large (100 m²+)"],
  icon: Icon.area,
};

const AREA_SIZE_STEP: Step = {
  id: "areaSize",
  question: "Roughly, what is the area size you need pressure washed?",
  placeholder: "e.g. 30 square meters",
  kind: "text",
  options: [],
  icon: Icon.area,
};

const ADDITIONAL_INFO_STEP: Step = {
  id: "additionalInfo",
  question: "Any additional information?",
  subtitle: "Feel free to share any extra details about the job.",
  placeholder: "e.g. Access notes, specific areas, special requirements…",
  kind: "textarea",
  options: [],
  icon: Icon.addons,
};

const PREMISES_STEP: Step = {
  id: "premisesType",
  question: "What type of commercial premises?",
  kind: "single",
  options: ["Medical / Dental", "Office", "Restaurant or Café", "Retail / Shop", "Warehouse", "Other"],
  icon: Icon.premises,
};

// ── Dynamic step builder for all residential services ─────────
const DOMESTIC_SERVICES = new Set([
"End of Tenancy Cleaning",
"Deep Cleaning",
"After Builders",
"Other",
]);

function getDomesticSteps(answers: Partial<InquiryAnswers>): Step[] {
  const steps: Step[] = [
    BEDROOMS_STEP,           // Q2
    BATHROOMS_STEP,          // Q3
    LIVING_AREAS_STEP,       // Q4
    KITCHEN_STEP,            // Q5
    CUPBOARD_TOPS_STEP,      // Q5a
    APPLIANCE_CLEANING_STEP, // Q6
  ];

  if (answers.applianceCleaning === "Yes") {
    steps.push(APPLIANCES_STEP); // Q6a
  }

  steps.push(ADDITIONAL_AREAS_STEP);   // Q7
  steps.push(SOFT_FURNISHINGS_STEP);  // Q7a
  steps.push(CARPET_CLEANING_STEP);   // Q8

  if (answers.carpetCleaning === "Yes please") {
    steps.push(CARPET_AREAS_STEP); // Q8a
  }

  steps.push(WINDOW_CLEANING_STEP);          // Q9
  steps.push(FURNISHED_STEP);                // Q10
  steps.push(PRESSURE_WASHING_NEEDED_STEP);  // Q11

  if (answers.pressureWashingNeeded === "Yes") {
    steps.push(PRESSURE_WASH_SURFACES_STEP); // Q11a
  }

  steps.push(OTHER_SERVICES_STEP);       // Q12
  steps.push(PROPERTY_CONDITION_STEP);   // Q13
  steps.push(DATE_STEP);

  return steps;
}

// ── Static flows for non-domestic services ────────────────────
const STATIC_SERVICE_FLOW: Record<string, Step[]> = {
"Carpet & Upholstery": [CARPETED_AREAS_STEP, RUG_COUNT_STEP, UPHOLSTERY_ITEMS_STEP, STAIRS_HALLWAYS_STEP, DATE_STEP],
"Appliances Cleaning": [APPLIANCES_STEP, DATE_STEP],
"Pressure Washing":    [PRESSURE_WASH_SURFACES_STEP, AREA_SIZE_STEP, OTHER_SERVICES_STEP, ADDITIONAL_INFO_STEP, DATE_STEP],
"Commercial Cleaning": [PREMISES_STEP, DATE_STEP],
"Other":               [DATE_STEP],
};

const ALL_SERVICES = [
"End of Tenancy Cleaning",
"Deep Cleaning",
"After Builders",
"Appliances Cleaning",
"Pressure Washing",
"Carpet & Upholstery",
"Commercial Cleaning",
"Other",
];

function getServiceSteps(answers: Partial<InquiryAnswers>): Step[] {
  const service = answers.serviceType;
  if (!service) return [];
  if (DOMESTIC_SERVICES.has(service)) return getDomesticSteps(answers);
  return STATIC_SERVICE_FLOW[service] ?? [DATE_STEP];
}

const SERVICE_STEP: Step = {
  id: "serviceType",
  question: "What service do you require?",
  kind: "single",
  options: ALL_SERVICES,
  icon: Icon.service,
};

// ── Component ─────────────────────────────────────────────────
export default function InquiryWizard({ onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<InquiryAnswers>>({});
  const [multiSel, setMultiSel] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [dateVal, setDateVal] = useState("");
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const serviceSteps = getServiceSteps(answers);
  const totalSteps = 1 + serviceSteps.length;
  const step: Step = stepIndex === 0 ? SERVICE_STEP : serviceSteps[stepIndex - 1];
  const progress = (stepIndex / totalSteps) * 100;

  function slide(dir: "forward" | "back", cb: () => void) {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => { cb(); setAnimating(false); setCustomInput(""); setDateVal(""); }, 260);
  }

  function advance(next: Partial<InquiryAnswers>) {
    const nextSteps = getServiceSteps(next);
    const nextTotal = 1 + nextSteps.length;
    if (stepIndex < nextTotal - 1) {
      slide("forward", () => {
        setStepIndex((i) => i + 1);
        setAnswers(next);
        setMultiSel([]);
      });
    } else {
      onComplete(next as InquiryAnswers);
    }
  }

  function choose(value: string) {
    if (step.id === "serviceType") {
      const next = { serviceType: value };
      slide("forward", () => {
        setStepIndex(1);
        setAnswers(next);
        setMultiSel([]);
      });
    } else {
      advance({ ...answers, [step.id]: value });
    }
  }

  function submitCustomSingle() {
    const val = customInput.trim();
    if (!val) return;
    choose(val);
  }

  function toggleMulti(value: string) {
    setMultiSel((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function addCustomToMulti() {
    const val = customInput.trim();
    if (!val || multiSel.includes(val)) return;
    setMultiSel((prev) => [...prev, val]);
    setCustomInput("");
  }

  function confirmMulti() {
    advance({ ...answers, [step.id]: multiSel.length ? multiSel.join(", ") : "None" });
  }

  function goBack() {
    if (stepIndex === 0) return;
    slide("back", () => {
      setStepIndex((i) => i - 1);
      setMultiSel([]);
      if (stepIndex === 1) setAnswers({});
    });
  }

  const slideClass = animating
    ? direction === "forward"
      ? "opacity-0 -translate-x-6"
      : "opacity-0 translate-x-6"
    : "opacity-100 translate-x-0";

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-400 ">
            Step {stepIndex + 1} of {totalSteps}
          </span>
          <span className="text-xs font-bold text-accent">{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step card */}
      <div className={`transition-all duration-260 ease-in-out ${slideClass}`}>
        {/* Icon + question */}
        <div className="mb-7">
          <div className="w-12 h-12 rounded-2xl bg-accent/8 flex items-center justify-center text-accent mb-4">
            {step.icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {step.question}
          </h3>
          {step.subtitle ? (
            <p className="text-sm text-slate-400 mt-1">{step.subtitle}</p>
          ) : step.kind === "multi" ? (
            <p className="text-sm text-slate-400 mt-1">Select all that apply.</p>
          ) : null}
        </div>

        {/* Single-choice grid */}
        {step.kind === "single" && (() => {
          const effectiveSel = answers[step.id] as string | undefined ?? null;
          return (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {step.options.map((opt) => {
                  const selected = effectiveSel === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => choose(opt)}
                      className={`relative rounded-2xl border-2 px-4 py-4 text-sm font-semibold text-left transition-all duration-200 ${
                        selected
                          ? "border-accent bg-accent text-white shadow-md shadow-accent/20"
                          : "border-slate-200 bg-white text-slate-700 hover:border-accent hover:bg-accent/5 hover:-translate-y-0.5"
                      }`}
                    >
                      {selected && <span className="absolute top-2.5 right-3 text-white/80 text-xs">✓</span>}
                      {opt}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitCustomSingle()}
                  placeholder="Or type your own answer…"
                  className="flex-1 bg-[#F3F4F6] rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                />
                <button
                  onClick={submitCustomSingle}
                  disabled={!customInput.trim()}
                  className="rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white disabled:opacity-30 hover:bg-accent-light transition-colors"
                >
                  Go
                </button>
              </div>
            </>
          );
        })()}

        {/* Free text input */}
        {step.kind === "text" && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && customInput.trim() && choose(customInput.trim())}
              placeholder={step.placeholder ?? "Type your answer…"}
              className="w-full bg-[#F3F4F6] rounded-2xl px-5 py-4 text-base text-slate-800 placeholder-slate-400 outline-none border-2 border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
            />
            <button
              onClick={() => customInput.trim() && choose(customInput.trim())}
              disabled={!customInput.trim()}
              className="w-full bg-accent text-white font-bold text-sm py-4 rounded-xl hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
            <button
              onClick={() => choose("Not sure")}
              className="text-sm text-slate-400 hover:text-accent transition-colors text-center"
            >
              Not sure, skip this
            </button>
          </div>
        )}

        {/* Textarea input */}
        {step.kind === "textarea" && (
          <div className="flex flex-col gap-4">
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder={step.placeholder ?? "Add any extra details…"}
              rows={5}
              className="w-full bg-[#F3F4F6] rounded-2xl px-5 py-4 text-base text-slate-800 placeholder-slate-400 outline-none border-2 border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all resize-none"
            />
            <button
              onClick={() => advance({ ...answers, [step.id]: customInput.trim() || "None" })}
              className="w-full bg-accent text-white font-bold text-sm py-4 rounded-xl hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20 transition-all active:scale-[0.98]"
            >
              {customInput.trim() ? "Continue →" : "Skip →"}
            </button>
          </div>
        )}

        {/* Date picker */}
        {step.kind === "date" && (
          <div className="flex flex-col gap-4">
            <input
              type="date"
              value={dateVal}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDateVal(e.target.value)}
              className="w-full bg-[#F3F4F6] rounded-2xl px-5 py-4 text-base text-slate-800 outline-none border-2 border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all cursor-pointer"
            />
            <button
              onClick={() => {
                if (!dateVal) return;
                const [y, m, d] = dateVal.split("-");
                const label = new Date(+y, +m - 1, +d).toLocaleDateString("en-GB", {
                  day: "numeric", month: "long", year: "numeric",
                });
                advance({ ...answers, preferredDate: label });
              }}
              disabled={!dateVal}
              className="w-full bg-accent text-white font-bold text-sm py-4 rounded-xl hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {dateVal ? "Confirm Date →" : "Pick a date above"}
            </button>
            <button
              onClick={() => advance({ ...answers, preferredDate: "Flexible / Not sure" })}
              className="text-sm text-slate-400 hover:text-accent transition-colors text-center"
            >
              I'm flexible, no preference
            </button>
          </div>
        )}

        {/* Multi-choice grid */}
        {step.kind === "multi" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[...step.options, ...multiSel.filter((v) => !step.options.includes(v))].map((opt) => {
                const selected = multiSel.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleMulti(opt)}
                    className={`relative rounded-2xl border-2 px-4 py-4 text-sm font-semibold text-left transition-all duration-200 ${
                      selected
                        ? "border-accent bg-accent text-white shadow-md shadow-accent/20"
                        : "border-slate-200 bg-white text-slate-700 hover:border-accent hover:bg-accent/5 hover:-translate-y-0.5"
                    }`}
                  >
                    {selected && <span className="absolute top-2.5 right-3 text-white/80 text-xs">✓</span>}
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomToMulti()}
                placeholder="Add your own item…"
                className="flex-1 bg-[#F3F4F6] rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
              />
              <button
                onClick={addCustomToMulti}
                disabled={!customInput.trim()}
                className="rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white disabled:opacity-30 hover:bg-accent-light transition-colors"
              >
                Add
              </button>
            </div>
            <button
              onClick={confirmMulti}
              className="mt-4 w-full bg-accent text-white font-bold text-sm py-4 rounded-xl hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20 transition-all active:scale-[0.98]"
            >
              {multiSel.length === 0 ? "Skip →" : `Continue with ${multiSel.length} selected →`}
            </button>
          </>
        )}
      </div>

      {/* Back button */}
      {stepIndex > 0 && (
        <button
          onClick={goBack}
          className="mt-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-accent transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
      )}
    </div>
  );
}
