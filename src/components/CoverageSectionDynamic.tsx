"use client";
import dynamic from "next/dynamic";

const CoverageSection = dynamic(() => import("./CoverageSection"), { ssr: false });
export default CoverageSection;
