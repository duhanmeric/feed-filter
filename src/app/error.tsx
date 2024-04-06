"use client";

import { Button } from "@/components/ui/button";

const Error = ({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) => {

    return (
        <main className="container flex h-full max-w-screen-2xl flex-col justify-center py-4">
            <div className="text-center mb-14">
                <h1 className="text-4xl mb-4 font-bold">There was an error.</h1>
                <Button onClick={() => reset()}>Try Again</Button>
            </div>
        </main>
    );
}

export default Error; 