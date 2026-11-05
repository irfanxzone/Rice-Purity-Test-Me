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
        <div className="my-8 min-h-[100px] w-full" aria-label="Advertisement">
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-2310430198181820"
                data-ad-slot="2221211839"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
