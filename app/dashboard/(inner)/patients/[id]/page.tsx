import { Suspense } from "react";
import PatientProfileClient from "./PatientProfileClient";
import { Loader2 } from "lucide-react";

export function generateStaticParams() {
    return [{ id: "default" }];
}

export default function PatientProfilePage() {
    return (
        <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
            </div>
        }>
            <PatientProfileClient />
        </Suspense>
    );
}
