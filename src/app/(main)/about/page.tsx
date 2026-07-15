'use client';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Startup Navigator</h1>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Startup Navigator is dedicated to democratizing startup knowledge and making it accessible to everyone. We believe that great ideas deserve the right guidance, and our mission is to provide entrepreneurs with the most comprehensive, up-to-date, and practical information they need to build and scale successful startups.
        </p>
      </section>

      {/* What We Offer */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
        <ul className="space-y-4 text-gray-700">
          <li className="flex gap-4">
            <span className="text-blue-600 font-bold text-2xl">•</span>
            <div>
              <h4 className="font-bold text-gray-900">AI-Powered Search</h4>
              <p>Get intelligent, context-aware answers to your startup questions instantly</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-600 font-bold text-2xl">•</span>
            <div>
              <h4 className="font-bold text-gray-900">Comprehensive Articles</h4>
              <p>Deep dives into every aspect of startup building, from ideation to exit</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-600 font-bold text-2xl">•</span>
            <div>
              <h4 className="font-bold text-gray-900">Curated Resources</h4>
              <p>Handpicked tools, courses, and communities to support your journey</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-600 font-bold text-2xl">•</span>
            <div>
              <h4 className="font-bold text-gray-900">Analytics & Insights</h4>
              <p>Track your learning progress and get personalized recommendations</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Topics Covered */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Topics We Cover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { emoji: '🏢', title: 'Company Registration', desc: 'Legal structure, incorporation, and compliance' },
            { emoji: '💰', title: 'Funding', desc: 'Venture capital, angel investors, and bootstrapping' },
            { emoji: '⚖️', title: 'Legal Compliance', desc: 'Contracts, IP, and regulatory requirements' },
            { emoji: '👥', title: 'Hiring', desc: 'Recruitment, team building, and culture' },
            { emoji: '🎨', title: 'Branding', desc: 'Logo design, brand identity, and positioning' },
            { emoji: '📢', title: 'Marketing', desc: 'Growth strategies, customer acquisition, and retention' },
            { emoji: '💼', title: 'Taxation', desc: 'Tax planning, accounting, and financial management' },
            { emoji: '🚀', title: 'Fundraising', desc: 'Pitch decks, investor relations, and negotiations' },
            { emoji: '🤖', title: 'AI Tools', desc: 'Automation, productivity, and intelligence' },
            { emoji: '📈', title: 'Business Growth', desc: 'Scaling strategies, metrics, and expansion' },
          ].map((topic, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-2">{topic.emoji}</div>
              <h4 className="font-bold text-gray-900 mb-2">{topic.title}</h4>
              <p className="text-gray-600 text-sm">{topic.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Startup Navigator?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">✓ Expert Curated</h4>
            <p>Content created by startup founders and industry experts</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">✓ AI-Powered</h4>
            <p>Intelligent search that understands context and intent</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">✓ Always Updated</h4>
            <p>Latest trends, tools, and best practices regularly added</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">✓ Community Driven</h4>
            <p>Learn from thousands of entrepreneurs worldwide</p>
          </div>
        </div>
      </section>
    </div>
  );
}
