import Link from "next/link";
import { Mail, Heart } from "lucide-react";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span
              className="text-2xl font-bold"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                color: "#FF3E9A",
              }}
            >
              Chom Chom
            </span>
            <span
              className="ml-1 text-xs tracking-[0.3em] uppercase font-medium"
              style={{ color: "#18B35D" }}
            >
              Store
            </span>
            <p className="mt-3 text-sm text-gray-500 max-w-xs">
              Pre-loved designer fashion at prices you&apos;ll love. Giving beautiful
              clothes a second life, one piece at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-gray-500 hover:text-pink-500 transition-colors"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?conditions=NWT"
                  className="text-sm text-gray-500 hover:text-pink-500 transition-colors"
                >
                  New With Tags
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?brands=Lilly+Pulitzer"
                  className="text-sm text-gray-500 hover:text-pink-500 transition-colors"
                >
                  Lilly Pulitzer
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="mailto:hello@chomchomstore.com"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            Made with <Heart size={12} className="text-pink-400 fill-pink-400" /> by Chom Chom Store © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
