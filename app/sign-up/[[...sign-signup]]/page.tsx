import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp afterSignInUrl='/new-user' redirectUrl='/new-user' />;
}