"use client";

import Link from "next/link";

import { Facebook, Github, Linkedin } from "lucide-react";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo / About */}
          <div>
            <h2 className="text-xl font-bold">SkillBridge</h2>
            <p className="text-sm text-muted-foreground mt-3">
              Connect with expert tutors and start learning anything, anytime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/">Home</Link>
              <Link href="/tutors">Find Tutors</Link>
              <Link href="/category">Categories</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4 text-muted-foreground">
              <Link href="https://www.facebook.com/abuhasanxyz8">
                <Facebook size={18} />
              </Link>
              <Link href="https://github.com/abuhasanxt">
                <Github size={18} />
              </Link>
              <Link href="https://www.linkedin.com/in/abu-hasan8">
                <Linkedin size={18} />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
          <p>Built with ❤️ for learners & tutors</p>
        </div>
      </div>
    </footer>
  );
}
