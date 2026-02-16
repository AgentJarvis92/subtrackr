'use client';

import { useState, useEffect } from 'react';
import { Plus, DollarSign, Calendar, TrendingUp, Download, Bell } from 'lucide-react';
import Link from 'next/link';
import { storage, Subscription } from '@/lib/storage';

export default function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load subscriptions from localStorage on mount
  useEffect(() => {
    const loaded = storage.getSubscriptions();
    setSubscriptions(loaded);
    setIsLoaded(true);
  }, []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSub, setNewSub] = useState({
    name: '',
    cost: '',
    billing_cycle: 'monthly',
    renewal_date: '',
    category: '',
    notes: ''
  });

  // Calculate totals
  const monthlyTotal = subscriptions.reduce((sum, sub) => {
    const monthlyCost = sub.billing_cycle === 'monthly' ? sub.cost : sub.cost / 12;
    return sum + monthlyCost;
  }, 0);

  const yearlyTotal = monthlyTotal * 12;

  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubscription = storage.addSubscription({
      name: newSub.name,
      cost: parseFloat(newSub.cost),
      billing_cycle: newSub.billing_cycle as 'monthly' | 'yearly',
      renewal_date: newSub.renewal_date,
      category: newSub.category,
      notes: newSub.notes
    });
    setSubscriptions([...subscriptions, newSubscription]);
    setNewSub({
      name: '',
      cost: '',
      billing_cycle: 'monthly',
      renewal_date: '',
      category: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      storage.deleteSubscription(id);
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysUntilRenewal = (dateString: string) => {
    const renewal = new Date(dateString);
    const today = new Date();
    const diffTime = renewal.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">SubTrackr</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Bell className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-semibold">JD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Monthly Total</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">${monthlyTotal.toFixed(2)}</div>
            <div className="text-sm text-gray-500 mt-1">Per month</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Yearly Total</span>
              <Calendar className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">${yearlyTotal.toFixed(2)}</div>
            <div className="text-sm text-gray-500 mt-1">Per year</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Active Subscriptions</span>
              <DollarSign className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{subscriptions.length}</div>
            <div className="text-sm text-gray-500 mt-1">Services</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Avg. Per Service</span>
              <Download className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${subscriptions.length > 0 ? (monthlyTotal / subscriptions.length).toFixed(2) : '0.00'}
            </div>
            <div className="text-sm text-gray-500 mt-1">Monthly</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Subscriptions</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Subscription</span>
          </button>
        </div>

        {/* Add Subscription Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
            <h3 className="text-xl font-semibold mb-4">Add New Subscription</h3>
            <form onSubmit={handleAddSubscription} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={newSub.name}
                  onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Netflix"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newSub.cost}
                  onChange={(e) => setNewSub({ ...newSub, cost: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="15.99"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Cycle *
                </label>
                <select
                  value={newSub.billing_cycle}
                  onChange={(e) => setNewSub({ ...newSub, billing_cycle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Renewal Date *
                </label>
                <input
                  type="date"
                  required
                  value={newSub.renewal_date}
                  onChange={(e) => setNewSub({ ...newSub, renewal_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={newSub.category}
                  onChange={(e) => setNewSub({ ...newSub, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Streaming, Software"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <input
                  type="text"
                  value={newSub.notes}
                  onChange={(e) => setNewSub({ ...newSub, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Optional notes"
                />
              </div>

              <div className="md:col-span-2 flex space-x-4">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Add Subscription
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Subscriptions List */}
        <div className="space-y-4">
          {subscriptions.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No subscriptions yet</h3>
              <p className="text-gray-600 mb-6">Add your first subscription to start tracking your spending</p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Subscription</span>
              </button>
            </div>
          ) : (
            subscriptions.map((sub) => {
              const daysUntil = getDaysUntilRenewal(sub.renewal_date);
              const isUpcoming = daysUntil <= 7;

              return (
                <div 
                  key={sub.id} 
                  className={`bg-white p-6 rounded-xl shadow-sm border-2 ${
                    isUpcoming ? 'border-orange-200 bg-orange-50' : 'border-gray-200'
                  } hover:shadow-md transition`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg font-bold text-indigo-600">
                            {sub.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{sub.name}</h3>
                          {sub.category && (
                            <span className="text-sm text-gray-500">{sub.category}</span>
                          )}
                        </div>
                      </div>
                      {sub.notes && (
                        <p className="text-sm text-gray-600 ml-15">{sub.notes}</p>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">
                        ${sub.cost.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500 capitalize mb-2">
                        {sub.billing_cycle}
                      </div>
                      <div className={`text-sm ${isUpcoming ? 'text-orange-600 font-semibold' : 'text-gray-600'}`}>
                        {isUpcoming && '⚠️ '}
                        Renews {formatDate(sub.renewal_date)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {daysUntil > 0 ? `${daysUntil} days` : 'Today'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(sub.id)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Upgrade CTA for Free Users */}
        {subscriptions.length >= 3 && (
          <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-xl text-white text-center">
            <h3 className="text-2xl font-bold mb-2">You've reached the free limit!</h3>
            <p className="mb-6">Upgrade to Pro to track unlimited subscriptions and get reminders</p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition font-semibold">
              Upgrade to Pro - $12/month
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
