export default function Footer() {
  return (
    <footer className="bg-brand-card py-12 border-t border-brand-border mt-auto relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50 blur-sm"></div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Project Name */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent tracking-wide">
              SecureScan
            </h3>
          </div>

          {/* Description */}
          <p className="text-brand-text-secondary font-medium max-w-lg mx-auto leading-relaxed">
            Empowering users to navigate the digital world safely. <br/>
            Analyze, Verify, and Protect.
          </p>



          {/* Copyright */}
          <p className="text-brand-text-secondary/50 text-sm mt-8 border-t border-brand-border/50 pt-6 w-full max-w-xs mx-auto">
            © 2026 SecureScan · Cyber Awareness
          </p>
        </div>
      </div>
    </footer>
  );
}
