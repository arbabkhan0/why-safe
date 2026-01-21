import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const phrases = [
  "Analyze digital threats instantly",
  "Verify links, messages, and identities",
  "Protect yourself from online scams",
];

export default function Home() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout;

    if (!isDeleting && displayText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, 120);
    } else if (!isDeleting && displayText.length === currentPhrase.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      }, 60);
    } else if (isDeleting && displayText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 500);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [displayText, isDeleting, currentPhraseIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

    const features = [
      {
        title: "URL Analyzer",
        description: "Detect phishing and malicious links before opening them.",
        link: "/url",
        icon: "🔗",
        gradient: "from-brand-primary to-brand-accent",
      },
      {
        title: "Message Analyzer",
        description: "Identify scam or suspicious SMS and WhatsApp messages.",
        link: "/message",
        icon: "💬",
        gradient: "from-brand-secondary to-brand-primary",
      },
      {
        title: "Identity Checker",
        description: "Understand risks related to emails or usernames.",
        link: "/identity",
        icon: "🆔",
        gradient: "from-brand-success to-emerald-500",
      },
      {
        title: "QR Code Scanner",
        description: "Safely preview and analyze QR code destinations.",
        link: "/qr",
        icon: "📱",
        gradient: "from-brand-warning to-brand-danger",
      },
    ];

    return (
      <div className="min-h-screen bg-brand-bg relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
        
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 text-center z-10">
          {/* Decorative Glows */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
          <div className="absolute top-10 right-10 w-96 h-96 bg-brand-accent/20 rounded-full blur-[100px] opacity-30 animate-pulse animation-delay-2000"></div>
          
          <div className="relative">
            <div className="inline-block mb-6 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-sm font-medium text-brand-primary shadow-[0_0_15px_rgba(14,165,233,0.3)] backdrop-blur-sm">
              ✨ Cyber Awareness Platform
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-brand-text-primary mb-4 tracking-tight">
              WHY-SAFE! 
            </h1>

            <div className="flex justify-center items-center gap-2 mb-4">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-primary cyber-dot"
                style={{ animationDelay: "0s" }}
              ></span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-primary cyber-dot"
                style={{ animationDelay: "0.15s" }}
              ></span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-primary cyber-dot"
                style={{ animationDelay: "0.3s" }}
              ></span>
            </div>

            <div className="flex items-center justify-center mb-6 min-h-[1.5rem]">
              <span className="text-lg md:text-xl text-brand-text-secondary">
                {displayText}
              </span>
              <span
                aria-hidden="true"
                className={`ml-1 inline-block w-[1px] h-5 md:h-6 bg-brand-primary transition-opacity duration-200 ${
                  cursorVisible ? "opacity-80" : "opacity-0"
                }`}
              ></span>
            </div>

            <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
              <span className="font-semibold text-brand-text-primary">
                Security made simple.
              </span>{" "}
              Analyze suspicious links, messages, identities, and QR codes in
              seconds with our advanced AI-powered tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/url"
                className="px-10 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-xl font-bold shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:scale-105 transition-all duration-300"
              >
                Start Checking Now
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-brand-text-primary mb-4">
              Everything You Need to Stay Safe
            </h2>
            <p className="text-brand-text-secondary max-w-2xl mx-auto">
              Comprehensive tools designed to protect your digital life from every angle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>


      </div>
    );
  }

  function FeatureCard({ title, description, link, icon, gradient }) {
    return (
      <Link
        to={link}
        className="relative bg-brand-card rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition border border-brand-border overflow-hidden"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 hover:opacity-5 transition`}
        ></div>

        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 text-white`}
        >
          <span className="text-2xl">{icon}</span>
        </div>

        <h3 className="text-xl font-semibold text-brand-text-primary mb-3">
          {title}
        </h3>
        <p className="text-brand-text-secondary text-sm">{description}</p>

        <div className="mt-6 text-brand-primary text-sm font-medium">
          Try now →
        </div>
      </Link>
    );
  }
