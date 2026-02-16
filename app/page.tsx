import Link from 'next/link';
import { ArrowRight, DollarSign, Calendar, Bell, PieChart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">SubTrackr</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
        </nav>
        <Link 
          href="/dashboard"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Stop Wasting Money on
            <span className="text-indigo-600"> Forgotten Subscriptions</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Track all your subscriptions in one place. Get reminded before renewals. 
            Save hundreds of dollars per year on services you don't use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Start Tracking Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition text-lg font-semibold">
              See How It Works
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Free forever for up to 3 subscriptions. No credit card required.
          </p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Sample subscription cards */}
              {[
                { name: 'Netflix', amount: 15.99, date: '15th' },
                { name: 'Spotify', amount: 9.99, date: '20th' },
                { name: 'Adobe', amount: 54.99, date: '5th' }
              ].map((sub, i) => (
                <div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-indigo-200 rounded-lg"></div>
                    <span className="text-sm text-gray-500">Monthly</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{sub.name}</h3>
                  <p className="text-2xl font-bold text-indigo-600">${sub.amount}</p>
                  <p className="text-sm text-gray-500 mt-2">Renews on the {sub.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-indigo-100 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Monthly Spend</span>
                <span className="text-3xl font-bold text-indigo-600">$80.97</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to take control</h2>
          <p className="text-xl text-gray-600">Simple, powerful tools to manage your subscriptions</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: DollarSign,
              title: 'Track Spending',
              description: 'See exactly how much you spend monthly and yearly on all subscriptions.'
            },
            {
              icon: Calendar,
              title: 'Renewal Calendar',
              description: 'Never be surprised by a renewal. See all upcoming charges at a glance.'
            },
            {
              icon: Bell,
              title: 'Smart Reminders',
              description: 'Get notified 3 days before renewals so you can cancel if needed.'
            },
            {
              icon: PieChart,
              title: 'Category Insights',
              description: 'Understand your spending by category: streaming, software, fitness, and more.'
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div>
              <div className="text-5xl font-bold mb-2">$400</div>
              <div className="text-indigo-200">Average annual savings</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-indigo-200">Subscriptions tracked</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.9★</div>
              <div className="text-indigo-200">User rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600">Start free, upgrade when you need more</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">$0</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Track up to 3 subscriptions</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Basic spending overview</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Manual entry</span>
              </li>
            </ul>
            <Link 
              href="/dashboard"
              className="block w-full bg-gray-100 text-gray-900 text-center px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-indigo-600 p-8 rounded-2xl shadow-2xl border-2 border-indigo-700 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-white">$12</span>
              <span className="text-indigo-200">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-indigo-200 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">Unlimited subscriptions</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-indigo-200 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">Email renewal reminders</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-indigo-200 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">Category insights & charts</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-indigo-200 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">Export to CSV</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-indigo-200 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">Priority support</span>
              </li>
            </ul>
            <button className="block w-full bg-white text-indigo-600 text-center px-6 py-3 rounded-lg hover:bg-indigo-50 transition font-semibold">
              Upgrade to Pro
            </button>
            <p className="text-center text-indigo-200 text-sm mt-4">
              Save more than the cost in your first month
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to stop wasting money?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have taken control of their subscriptions and saved hundreds of dollars.
          </p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition text-lg font-semibold"
          >
            <span>Get Started for Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SubTrackr</span>
              </div>
              <p className="text-sm">Take control of your subscription spending.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2026 SubTrackr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
