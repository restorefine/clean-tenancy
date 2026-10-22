"use client";

import { useState } from "react";
import CoverageMap from "@/components/CoverageMap";
import { CheckCircle, XCircle, MapPin } from "lucide-react";

// UK postcode district → covered flag + human name
const COVERAGE: Record<string, { name: string; maxDistrict: number | number[][] }> = {
  G:  { name: "Glasgow & West Scotland", maxDistrict: 84 },
  EH: { name: "Edinburgh & Lothians",    maxDistrict: 55 },
  FK: { name: "Falkirk & Stirling",      maxDistrict: 21 },
  ML: { name: "Lanarkshire",             maxDistrict: 12 },
  PA: { name: "Paisley & Renfrewshire",  maxDistrict: 19 },
  KA: { name: "Ayrshire",               maxDistrict: 12 },
  KY: { name: "Fife",                   maxDistrict: [[1, 2], [11, 12]] },
  TD: { name: "Scottish Borders",        maxDistrict: [[1, 1]] },
};

function checkPostcode(raw: string): { status: "covered" | "not-covered" | "invalid"; areaName?: string; district?: string } {
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, "");
  // Accept full postcode (G1 1AA) or outward-only (G1, G12)
  const outwardMatch = cleaned.match(/^([A-Z]{1,2})(\d{1,2}[A-Z]?)(?:\d[A-Z]{2})?$/);
  if (!outwardMatch) return { status: "invalid" };

  const areaCode = outwardMatch[1];           // "G", "EH", "FK" …
  const districtRaw = outwardMatch[2];        // "1", "12", "1A" …
  const districtNum = parseInt(districtRaw, 10);
  const district = areaCode + districtRaw;

  const entry = COVERAGE[areaCode];
  if (!entry) return { status: "not-covered", district };

  const max = entry.maxDistrict;
  let inRange = false;
  if (typeof max === "number") {
    inRange = districtNum >= 1 && districtNum <= max;
  } else {
    inRange = (max as number[][]).some(([lo, hi]) => districtNum >= lo && districtNum <= hi);
  }

  return inRange
    ? { status: "covered", areaName: entry.name, district }
    : { status: "not-covered", district };
}

type Result = ReturnType<typeof checkPostcode> | null;

export default function CoverageSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<Result>(null);

  const glasgowAreas = ["Airdrie", "Ayr", "Clydebank", "Cumbernauld", "Dunfermline", "East Kilbride", "Falkirk", "Hamilton", "Helensburgh", "Irvine", "Kilmarnock", "Lanark", "Motherwell", "Paisley", "Stirling"];
  const edinburghAreas = ["Dalkeith", "Dunfermline", "Galashiels", "Kirkcaldy", "Linlithgow", "Livingston", "Musselburgh", "North Berwick"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setResult(checkPostcode(searchQuery));
  };

  const handleChange = (v: string) => {
    setSearchQuery(v);
    if (result) setResult(null);
  };

  const hubs = [
    { name: "Glasgow hub", areas: glasgowAreas, dot: "bg-accent", chip: "bg-accent/8 text-accent" },
    { name: "Edinburgh hub", areas: edinburghAreas, dot: "bg-leaf", chip: "bg-leaf/10 text-leaf" },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Map */}
          <div className="order-2 lg:order-1 lg:col-span-7 relative min-h-[380px] lg:min-h-[560px] rounded-[2rem] overflow-hidden bg-bg-soft isolate">
            <CoverageMap />
          </div>

          {/* Copy + checker */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary leading-[1.08] tracking-tight">Do we cover your area?</h2>
            <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">Two hubs and a 50 mile radius across Central Scotland. Check your postcode in seconds.</p>

            <form onSubmit={handleSearch} className="mt-8">
              <label htmlFor="postcode-check" className="block text-sm font-medium text-primary mb-2">Your postcode</label>
              <div className="flex items-center gap-2 rounded-full bg-bg-soft p-1.5 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-accent transition-shadow">
                <input
                  id="postcode-check"
                  type="text"
                  placeholder="e.g. G12 8QQ"
                  className="flex-1 min-w-0 bg-transparent outline-none px-4 py-2.5 text-primary placeholder-slate-500 font-medium"
                  value={searchQuery}
                  onChange={(e) => handleChange(e.target.value)}
                  maxLength={8}
                  autoComplete="postal-code"
                />
                <button type="submit" className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors active:scale-[0.98]">
                  Check
                </button>
              </div>
            </form>

            {/* Result */}
            <div aria-live="polite">
              {result && (
                <div className={`mt-4 rounded-2xl px-5 py-4 flex items-start gap-3 ${
                  result.status === "covered" ? "bg-lime/60" : result.status === "not-covered" ? "bg-red-50" : "bg-amber-50"
                }`}>
                  {result.status === "covered" && (
                    <>
                      <CheckCircle className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                      <p className="text-sm text-primary leading-relaxed">
                        <span className="font-semibold">Good news, we cover {result.district}.</span> It sits inside our {result.areaName} zone.
                      </p>
                    </>
                  )}
                  {result.status === "not-covered" && (
                    <>
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800 leading-relaxed">
                        <span className="font-semibold">{result.district} is outside our usual area.</span>{" "}
                        <a href="/contact" className="underline underline-offset-2">Get in touch</a> and we will see what we can do.
                      </p>
                    </>
                  )}
                  {result.status === "invalid" && (
                    <>
                      <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-900 leading-relaxed">
                        <span className="font-semibold">That doesn&apos;t look like a UK postcode.</span> Try G12 8QQ, EH3 5AB or just FK7.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Hubs */}
            <div className="mt-10 flex flex-col divide-y divide-slate-200 border-y border-slate-200">
              {hubs.map((hub) => (
                <div key={hub.name} className="py-5">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2.5 font-semibold text-primary">
                      <span className={`w-2.5 h-2.5 rounded-full ${hub.dot}`} />
                      {hub.name}
                    </h3>
                    <span className="text-sm text-muted">{hub.areas.length} towns</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hub.areas.map((area) => (
                      <span key={area} className={`rounded-full px-3 py-1 text-xs font-medium ${hub.chip}`}>{area}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
