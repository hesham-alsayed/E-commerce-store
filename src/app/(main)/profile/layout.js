import AuthGuard from "@/components/AuthGuard";

export default function ProfileLayout({ children }) {
  return (
    <AuthGuard>
      <div className="mt-20 max-w-6xl mx-auto px-4 py-6 min-h-screen">{children}</div>
    </AuthGuard>
  );
}
