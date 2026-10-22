"use client";
import dynamic from "next/dynamic";

const GallerySection = dynamic(() => import("./GallerySection"), { ssr: false });
export default GallerySection;
