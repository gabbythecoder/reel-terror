import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section>
      <div className="flex justify-center items-center mt-[3rem]">
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#da0000",
              colorBackground: "#fff",
              colorText: "#000",
            },
            elements: {
              formButtonPrimary:
                "bg-red-900 hover:bg-red-500 text-white font-semibold rounded px-12 py-2 transition-colors duration-200",
            },
          }}
        />
      </div>
    </section>
  );
}
