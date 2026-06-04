"use client";
import Link from "next/link";
import { SiX, SiInstagram ,SiGithub} from "react-icons/si"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">Orbit</h3>
            <p className="text-sm text-background/80">
              Premium clothing and accessories for every style.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-background/80">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=shirts" className="hover:text-background/80">
                  Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=shoes" className="hover:text-background/80">
                  Shoes
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-background/80">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background/80">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background/80">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-background/80">
                <SiX className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-background/80">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-background/80">
                <SiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/80">
          <p>&copy; 2026 Orbit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}