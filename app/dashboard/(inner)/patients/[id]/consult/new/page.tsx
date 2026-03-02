import NewConsultClient from "./NewConsultClient";

export function generateStaticParams() {
    return [{ id: "default" }];
}

export default function NewConsultPage() {
    return <NewConsultClient />;
}
