"use client";

import { Toaster } from "sonner";

export default function Providers({ children }) {
    return (
        <>
            {children}
            <Toaster position="bottom-center" richColors closeButton />
        </>
    );
}
