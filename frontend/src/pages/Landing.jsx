import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '📊',
      title: 'Smart Dashboard',
      description: 'Track all your invoices at a glance with beautiful statistics'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Create and manage invoices in seconds with our intuitive interface'
    },
    {
      icon: '🔐',
      title: 'Secure & Reliable',
      description: 'Your data is encrypted and safe with enterprise-grade security'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access your invoices anywhere, anytime on any device'
    },
    {
      icon: '💰',
      title: 'Payment Tracking',
      description: 'Monitor pending, paid, and overdue invoices effortlessly'
    },
    {
      icon: '👥',
      title: 'Multi-User Support',
      description: 'Manage multiple users with role-based admin access'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-fade-in overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/5 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">₹</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Invoice Manager</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-white hover:text-primary transition duration-300 font-semibold"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="gradient-primary text-white font-bold py-2 px-6 rounded-lg shadow-glow hover:shadow-glow-accent transform hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8 animate-slide-up">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Invoicing Made <span className="gradient-text">Simple</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create, manage, and track invoices with style. Our modern platform makes invoicing effortless for businesses of all sizes.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => navigate('/register')}
              className="gradient-primary text-white font-bold py-4 px-8 rounded-lg shadow-2xl hover:shadow-glow-accent transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-white/10 border-2 border-white/30 text-white font-bold py-4 px-8 rounded-lg hover:bg-white/20 hover:border-white/50 transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Already have an account?
            </button>
          </div>

          {/* Decorative Circle */}
          <div className="relative w-96 h-96 mx-auto mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute inset-12 bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-white text-lg font-semibold">Professional Invoicing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 animate-slide-up">
            Powerful <span className="gradient-text">Features</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:border-primary/50 hover:shadow-glow transform hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '1M+', label: 'Invoices Generated' },
              { number: '99.9%', label: 'Uptime' }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h4 className="text-5xl font-bold gradient-text mb-2">{stat.number}</h4>
                <p className="text-gray-300 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl mx-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
            Ready to transform your invoicing?
          </h3>
          <p className="text-xl text-white/90 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Join thousands of businesses using Invoice Manager today
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-purple-600 font-bold py-4 px-10 rounded-lg shadow-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-lg animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Invoice Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
