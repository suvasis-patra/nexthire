export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex items-center justify-center py-4">
      {children}
    </div>
  );
}
