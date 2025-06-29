import React from 'react';
import { FaGlobe, FaShieldAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A8381]/20 to-[#fefefe] text-gray-800 py-10 px-6 sm:px-10">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-primary">Trova</h1>
          <Link to="/" className="text-[#1A8381] hover:underline">
            Back to Home
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-2">Terms & Conditions</h2>
        <p className="text-gray-600">Last updated: June 2025</p>
      </header>

      {/* Content Box */}
      <main className="max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 rounded-2xl p-6 sm:p-10 overflow-hidden">
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <FaGlobe className="text-[#1A8381]" size={20} />
            <h3 className="text-xl font-semibold">1. Introduction</h3>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            Welcome to <span className="font-semibold">Trova</span> – a community for adventurers, travelers, and storytellers. By accessing or using Trova, you agree to be bound by these terms. If you disagree with any part, please discontinue using the platform.
          </p>
        </section>

        <section className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <FaUsers className="text-green-500" size={20} />
            <h3 className="text-xl font-semibold">2. User Responsibilities</h3>
          </div>
          <ul className="list-disc pl-6 text-sm sm:text-base space-y-1 text-gray-700">
            <li>Use Trova ethically and respectfully.</li>
            <li>Do not upload harmful or misleading content.</li>
            <li>Respect the intellectual property rights of others.</li>
            <li>You must be 13+ to register and use the platform.</li>
          </ul>
        </section>

        <section className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <FaShieldAlt className="text-yellow-500" size={20} />
            <h3 className="text-xl font-semibold">3. Privacy & Data</h3>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            We value your privacy. Your data will be handled in accordance with our <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>. We use cookies to personalize content and improve your experience.
          </p>
        </section>

        <section className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <FaCheckCircle className="text-purple-500" size={20} />
            <h3 className="text-xl font-semibold">4. Modifications</h3>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            Trova reserves the right to modify or update these terms at any time. We’ll notify users via in-app alerts or email. Continuing to use the app after changes implies your acceptance.
          </p>
        </section>

        <section className="mt-10 text-center">
          <p className="text-sm sm:text-base text-gray-600">
            If you have any questions about these Terms, please <Link to="/contact" className="text-blue-500 hover:underline">contact us</Link>.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2 bg-[#1A8381] text-white rounded-full hover:bg-[#1A8381]/90 transition"
          >
            Accept & Continue
          </Link>
        </section>
      </main>
    </div>
  );
};

export default TermsAndConditions;
