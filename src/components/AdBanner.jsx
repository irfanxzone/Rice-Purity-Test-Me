"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
    const adRef = useRef(null);
    const requested = useRef(false);

    useEffect(() => {
        if (requested.current || !adRef.current) return;
        requested.current = true;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error("AdSense banner could not load", error);
        }
    }, []);

    return (
        <div className="rpt-ad-banner my-5 min-h-[70px] w-full sm:my-6 sm:min-h-[110px]" aria-label="Advertisement">
            <style>{`
                .rpt-banner-slot { display: block; width: 100%; height: 50px; }
                @media (min-width: 640px) { .rpt-banner-slot { height: 90px; } }
                .rpt-ad-banner:has(ins[data-ad-status="unfilled"]) > p { visibility: hidden; }
            `}</style>
            <p className="mb-1 text-center text-[10px] leading-4 tracking-widest text-ink-500">Advertisement</p>
            <ins
                ref={adRef}
                className="adsbygoogle rpt-banner-slot"
                data-ad-client="ca-pub-2310430198181820"
                data-ad-slot="2221211839"
            />
        </div>
    );
}
