import "./globals.css";

export const metadata = {
  title: "Taskboard",
  description: "A simple task management board - create, update, and track tasks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
