import { Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-black rounded" />
              <h2 className="text-xl font-bold">PeerConnect</h2>
            </div>
            <p className="mt-2 text-sm muted">Learn better, together.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-4">
            <div>
              <h4 className="font-semibold">Company</h4>
              <nav className="mt-4 flex flex-col space-y-2">
                <a className="text-sm muted hover:text-brand" href="#">Learn Together</a>
                <a className="text-sm muted hover:text-brand" href="#">Join Community</a>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold">Support</h4>
              <nav className="mt-4 flex flex-col space-y-2">
                <a className="text-sm muted hover:text-brand" href="#">Help Center</a>
                <a className="text-sm muted hover:text-brand" href="#">Download App</a>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 md:flex md:items-center md:justify-between">
          <p className="text-sm muted">© {new Date().getFullYear()} PeerConnect. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0 text-muted">
            <a className="hover:text-brand" href="#"><Twitter className="h-6 w-6" /></a>
            <a className="hover:text-brand" href="#"><Facebook className="h-6 w-6" /></a>
            <a className="hover:text-brand" href="#"><Instagram className="h-6 w-6" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
