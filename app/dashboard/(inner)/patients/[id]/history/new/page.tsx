import InitialHistoryClient from "./InitialHistoryClient";

export function generateStaticParams() {
    return [{ id: "default" }];
}

export default function InitialHistoryPage() {
    return <InitialHistoryClient />;
}
