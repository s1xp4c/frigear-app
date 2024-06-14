import {NextResponse} from "next/server";
import {exportProductsToStripe, importStripeProducts} from "@/app/admin/products/actions/actions";

//A page displaying the following actions:
const actions: {
    name: string;
    description?: string;
    callback: () => Promise<NextResponse>;
}[] = [
    {
        name: "Import Stripe->Products",
        description: "Imports all products from stripe",
        callback: importStripeProducts,
    },
    {
        name: "Export Products->Stripe",
        description: "Exports all products to stripe",
        callback: exportProductsToStripe,
    }
];

export default function Page() {
    return (
        <ul>
            {actions.map(({name, description, callback}) => (
                <li key={name}>
                    <button formAction={callback}>
                        {name}<br/>
                        {description && <small>{description}</small>}
                    </button>
                </li>
            ))}
        </ul>
    )
}