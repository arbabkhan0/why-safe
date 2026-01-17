  import { Link } from "react-router-dom";
  import { useEffect, useState } from "react";

  export default function Home() {
    const fullText = "WHY-SAFE";
    const [text, setText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);

    // Typing effect
    useEffect(() => {
      let index = 0;
      const typingInterval = setInterval(() => {
        setText(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) {
          clearInterval(typingInterval);
        }
      }, 150);

      return () => clearInterval(typingInterval);
    }, []);

    // Blinking cursor
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
        gradient: "from-blue-500 to-cyan-500",
      },
      {
        title: "Message Analyzer",
        description: "Identify scam or suspicious SMS and WhatsApp messages.",
        link: "/message",
        icon: "💬",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        title: "Identity Checker",
        description: "Understand risks related to emails or usernames.",
        link: "/identity",
        icon: "🆔",
        gradient: "from-green-500 to-emerald-500",
      },
      {
        title: "QR Code Scanner",
        description: "Safely preview and analyze QR code destinations.",
        link: "/qr",
        icon: "📱",
        gradient: "from-orange-500 to-red-500",
      },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-24 text-center">
          {/* Decorative blobs */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-1/3 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          <div className="relative">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-700">
              Cyber Awareness Platform
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              {text}
              <span className={cursorVisible ? "opacity-100" : "opacity-0"}>|</span>
            </h1>

            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
              <span className="font-semibold text-gray-900">
                Security made simple.
              </span>{" "}
              Analyze suspicious links, messages, identities, and QR codes in
              seconds.
            </p>

            <Link
              to="/url"
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Start Checking Now
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-14">
            Everything You Need to Stay Safe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Secure Your Digital Life?
          </h2>
          <p className="text-blue-100 mb-8">
            Start using WHY-SAFE for free today.
          </p>
          <Link
            to="/url"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Get Started For Free
          </Link>
        </section>
      </div>
    );
  }

  function FeatureCard({ title, description, link, icon, gradient }) {
    return (
      <Link
        to={link}
        className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition border border-gray-100 overflow-hidden"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 hover:opacity-5 transition`}
        ></div>

        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4`}
        >
          <span className="text-2xl">{icon}</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">{description}</p>

        <div className="mt-6 text-blue-600 text-sm font-medium">
          Try now →
        </div>
      </Link>
    );
  }
