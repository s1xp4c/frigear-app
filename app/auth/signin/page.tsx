"use server";
import SignUp from "@/components/pages/sign-up";

type Params = {
    params: {}
};

export default async function Page({ params }: Params) {
    return <SignUp/>;
}
