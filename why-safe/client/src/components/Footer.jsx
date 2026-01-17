    export default function Footer() {
    return (
        <footer className="bg-gray-100 text-center text-gray-500 text-sm py-6">
        <p>
            © {new Date().getFullYear()} WHY-SAFE · Cyber Awareness Project
        </p>
        <p className="mt-1">
            Built to help users identify online risks before trusting them.
        </p>
        </footer>
    );
    }
