import { NavLink, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-6 h-14">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-black rounded" />
          <h2 className="text-xl font-bold">PeerConnect</h2>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <NavLink to="/" end className="hover:text-brand">Tutoring</NavLink>
          <NavLink to="/ai" className="hover:text-brand">AI Features</NavLink>
          <NavLink to="/about" className="hover:text-brand">About</NavLink>
          <NavLink to="/badges" className="hover:text-brand">Gamification</NavLink>
          <NavLink to="/pricing" className="hover:text-brand">Pricing</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-outline hidden sm:inline-flex">Sign In</button>
            </SignInButton>
            <Link to="/pricing" className="btn-primary">Get Started</Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/"/>
          </SignedIn>

          <button className="md:hidden p-2"><Menu className="h-6 w-6" /></button>
        </div>
      </div>
    </header>
  );
}
