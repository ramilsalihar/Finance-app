/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BarChart3, 
  History, 
  PieChart, 
  Settings, 
  Plus, 
  Calendar,
  Wallet,
  Stethoscope,
  Utensils,
  Shirt,
  Fuel,
  ArrowLeft,
  ChevronRight,
  ShoppingBag,
  Car,
  Clapperboard,
  Zap,
  Plane,
  PlusCircle,
  Lightbulb,
  Camera,
  X
} from 'lucide-react';

// --- Types ---
type Screen = 'home' | 'stats' | 'history' | 'budget' | 'settings' | 'add';

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  count?: number;
  date: string;
  type: 'expense' | 'income';
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

// --- Mock Data ---
const TRANSACTIONS: Transaction[] = [
  { id: '1', name: 'Salary', category: 'Income', amount: 1500, count: 12, date: 'Sept 2023', type: 'income', icon: Wallet, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { id: '2', name: 'Medicine', category: 'Health', amount: -420.50, count: 4, date: 'Sept 2023', type: 'expense', icon: Stethoscope, iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
  { id: '3', name: 'Restaurant', category: 'Food', amount: -680.00, count: 8, date: 'Sept 2023', type: 'expense', icon: Utensils, iconBg: 'bg-teal-100', iconColor: 'text-teal-600' },
  { id: '4', name: 'Cloth', category: 'Shopping', amount: -245.00, count: 2, date: 'Sept 2023', type: 'expense', icon: Shirt, iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
  { id: '5', name: 'Fuel', category: 'Transport', amount: -120.00, count: 5, date: 'Sept 2023', type: 'expense', icon: Fuel, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
];

const MAJOR_TRANSACTIONS: Transaction[] = [
  { id: 'm1', name: 'Apple Store Purchase', category: 'Gadgets', amount: -1299.00, date: 'Yesterday, 4:20 PM', type: 'expense', icon: ShoppingBag, iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
  { id: 'm2', name: 'Monthly Rent', category: 'Housing', amount: -2100.00, date: 'Sept 1, 10:00 AM', type: 'expense', icon: Home, iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
];

// --- Components ---

const Navbar = ({ active, onChange }: { active: Screen; onChange: (s: Screen) => void }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'budget', icon: PieChart, label: 'Budget' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-slate-100 rounded-t-[32px] px-6 pb-8 pt-3 flex justify-between items-center">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id as Screen)}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ${
            active === item.id ? 'bg-indigo-50 text-indigo-600 scale-110' : 'text-slate-400'
          }`}
        >
          <item.icon size={22} fill={active === item.id ? 'currentColor' : 'none'} fillOpacity={0.2} />
          <span className="text-[10px] font-semibold tracking-tight">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

const Dashboard = ({ onAdd, transactions }: { onAdd: () => void; transactions: Transaction[] }) => {
  const totalSpent = Math.abs(transactions.reduce((acc, t) => t.type === 'expense' ? acc + t.amount : acc, 0)).toLocaleString('en-US', { minimumFractionDigits: 2 });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Summary Card */}
      <section className="bg-white rounded-[32px] p-8 card-elevation text-center space-y-6">
        <div>
          <p className="text-sm font-medium text-on-surface-variant">Total Spent</p>
          <h2 className="text-4xl font-extrabold text-indigo-600 mt-1">${totalSpent}</h2>
        </div>

        {/* Circular Chart Placeholder/SVG */}
        <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="251.2" strokeDashoffset="125" strokeLinecap="round" className="text-indigo-500" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="251.2" strokeDashoffset="200" strokeLinecap="round" className="text-teal-400" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="251.2" strokeDashoffset="230" strokeLinecap="round" className="text-rose-400" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em]">MONTHLY</span>
            <span className="text-lg font-bold text-slate-800">Target</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-y-3 gap-x-2">
          {['Salary', 'Restaurant', 'Medicine', 'Fuel', 'Cloth'].map((cat, i) => (
            <div key={cat} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${['bg-indigo-500', 'bg-teal-400', 'bg-rose-400', 'bg-orange-400', 'bg-slate-300'][i]}`} />
              <span className="text-[10px] font-semibold text-slate-500">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Top Spending */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Top Spending</h3>
          <button className="text-sm font-semibold text-indigo-600">View All</button>
        </div>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded-2xl flex justify-between items-center card-elevation">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${t.iconBg} ${t.iconColor} rounded-full flex items-center justify-center`}>
                  <t.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{t.name}</p>
                  <p className="text-[10px] font-semibold text-slate-400">{t.count ? `${t.count} Transactions` : t.date}</p>
                </div>
              </div>
              <p className="text-base font-bold text-slate-800">{t.amount < 0 ? `-` : ''}${Math.abs(t.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAB - Inside Dashboard for simplicity but technically global */}
      <button 
        onClick={onAdd}
        className="fixed bottom-28 right-6 w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40"
      >
        <Plus size={32} strokeWidth={3} />
      </button>
    </motion.div>
  );
};

const AddExpense = ({ onBack, onSave }: { onBack: () => void; onSave: (tx: Partial<Transaction>) => void }) => {
  const [amount, setAmount] = useState('0.00');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const categories = [
    { id: 'shop', name: 'Shopping', icon: ShoppingBag, color: 'text-pink-500', bg: 'bg-pink-50' },
    { id: 'food', name: 'Food', icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'trans', name: 'Transport', icon: Car, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'mov', name: 'Movies', icon: Clapperboard, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'health', name: 'Health', icon: Stethoscope, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'bills', name: 'Bills', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: 'travel', name: 'Travel', icon: Plane, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'other', name: 'Other', icon: PlusCircle, color: 'text-slate-500', bg: 'bg-slate-50' },
  ];

  const handleSave = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    
    const cat = categories[selectedCategory];
    onSave({
      amount: numAmount,
      name: cat.name,
      category: cat.name,
      icon: cat.icon,
      iconBg: cat.bg,
      iconColor: cat.color
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="space-y-8 pb-32"
    >
      <header className="flex justify-between items-center -mx-5 px-5 h-16 bg-white/80 backdrop-blur-md sticky top-0 z-50 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={24} className="text-indigo-600" />
          </button>
          <h1 className="text-lg font-bold text-slate-800">Add Expense</h1>
        </div>
        <div className="flex items-center gap-2 text-indigo-600 font-semibold bg-indigo-50 px-3 py-1.5 rounded-full text-xs">
          <Calendar size={14} />
          <span>Sep 24, 2023</span>
        </div>
      </header>

      <section className="text-center py-6">
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">ENTER AMOUNT</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          <span className="text-3xl font-bold text-indigo-500">$</span>
          <input 
            autoFocus
            type="text" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-40 text-5xl font-black text-slate-800 bg-transparent border-none focus:ring-0 text-center p-0"
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Select Category</h3>
          <button className="text-xs font-semibold text-indigo-600">View All</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <button 
              key={cat.id} 
              onClick={() => setSelectedCategory(i)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl bg-white card-elevation transition-all ${selectedCategory === i ? 'ring-2 ring-indigo-500 bg-indigo-50/30' : 'hover:bg-indigo-50'}`}
            >
              <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-full flex items-center justify-center mb-1`}>
                <cat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-slate-600">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-3xl p-6 card-elevation space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
            <History size={18} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">DATE & TIME</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm font-semibold text-slate-700">Today, 14:30</span>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          </div>
        </div>
        <div className="h-px bg-slate-100" />
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mt-1">
            <History size={18} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">NOTE</p>
            <textarea placeholder="Add a description..." className="w-full mt-1 bg-transparent border-none p-0 focus:ring-0 text-sm font-semibold text-slate-700 placeholder:text-slate-300 resize-none h-12" />
          </div>
        </div>
      </section>

      <section className="flex gap-4 overflow-x-auto pb-4 scroll-smooth hide-scrollbar -mx-2 px-2">
        <button className="flex-shrink-0 w-32 h-32 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-slate-100 transition-colors">
          <Camera size={32} strokeWidth={1.5} />
          <span className="text-[10px] font-bold uppercase">Add Receipt</span>
        </button>
        <div className="flex-shrink-0 w-32 h-32 rounded-3xl overflow-hidden relative group">
          <img 
            src="https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=300&auto=format&fit=crop" 
            alt="Receipt" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <X size={24} className="text-white" />
          </div>
        </div>
      </section>

      <button 
        onClick={handleSave}
        className="w-full py-4 bg-indigo-600 text-white rounded-full text-lg font-bold shadow-xl shadow-indigo-100 active:scale-[0.98] transition-transform"
      >
        Save Expense
      </button>
    </motion.div>
  );
};

const Stats = () => {
  const categories = [
    { name: 'Transportation', status: 'Still on track', spent: 240.50, limit: 500.00, color: 'bg-teal-400', icon: Car, bg: 'bg-teal-50', statusColor: 'text-teal-500' },
    { name: 'Education', status: 'Almost exceeding', spent: 890.00, limit: 1000.00, color: 'bg-rose-500', icon: History, bg: 'bg-rose-50', statusColor: 'text-rose-500' },
    { name: 'Food & Dining', status: 'Healthy spending', spent: 310.00, limit: 800.00, color: 'bg-indigo-500', icon: Utensils, bg: 'bg-indigo-50', statusColor: 'text-indigo-500' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 pb-32"
    >
      <section className="bg-indigo-600 rounded-[32px] p-8 text-white card-elevation relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />
        
        <div className="relative z-10 space-y-1">
          <p className="text-[10px] font-bold text-indigo-100 tracking-widest uppercase">TOTAL MONTHLY BUDGET</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-black">$4,250.00</h2>
            <span className="text-sm font-medium text-indigo-100/70">left</span>
          </div>
          <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold text-indigo-100 opacity-60">Total Spent</p>
              <p className="text-xl font-bold">$1,750.00</p>
            </div>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-teal-400 border-2 border-indigo-600 flex items-center justify-center text-[10px] font-black text-teal-900">MB</div>
              <div className="w-8 h-8 rounded-full bg-rose-300 border-2 border-indigo-600 flex items-center justify-center text-[10px] font-black text-rose-900">JD</div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex bg-slate-100 p-1.5 rounded-full">
        <button className="flex-1 bg-white py-2.5 rounded-full text-sm font-bold text-indigo-600 shadow-sm transition-all">Expense</button>
        <button className="flex-1 py-2.5 rounded-full text-sm font-bold text-slate-400 hover:text-slate-600 transition-all">Income</button>
      </div>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Monthly Budget</h1>
            <p className="text-xs font-semibold text-slate-400">You have 12 active categories</p>
          </div>
          <button className="text-sm font-bold text-indigo-600 flex items-center">
            See All <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white p-5 rounded-[28px] card-elevation space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${cat.bg} ${cat.statusColor} rounded-2xl flex items-center justify-center`}>
                    <cat.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{cat.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 ${cat.statusColor}`}>
                      {cat.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">${cat.spent.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-slate-400">of ${cat.limit.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${cat.color} rounded-full`} 
                    style={{ width: `${(cat.spent / cat.limit) * 100}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>${(cat.spent / 30).toFixed(2)} avg. daily</span>
                  <span>{Math.round((cat.spent / cat.limit) * 100)}% used</span>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[28px] p-6 text-white card-elevation flex flex-col justify-between min-h-40 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
               <span className="text-[10px] font-bold px-2 py-1 bg-white/20 rounded-full">New Tip</span>
             </div>
             <Lightbulb className="w-10 h-10 p-2 bg-white/20 rounded-xl" />
             <div className="mt-4">
                <h4 className="text-lg font-bold leading-tight">Switch to weekly grocery planning</h4>
                <p className="text-xs font-medium text-indigo-100/70">You could save up to $120/mo</p>
             </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Major Transactions</h3>
        <div className="space-y-3">
          {MAJOR_TRANSACTIONS.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded-3xl flex justify-between items-center card-elevation">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center">
                  <t.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{t.name}</p>
                  <p className="text-[10px] font-semibold text-slate-400">{t.date}</p>
                </div>
              </div>
              <p className="text-base font-bold text-rose-500">${t.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);

  const handleSaveExpense = (newTx: Partial<Transaction>) => {
    const tx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      name: newTx.name || 'Expense',
      category: newTx.category || 'Other',
      amount: -(newTx.amount || 0),
      count: 1,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      type: 'expense',
      icon: newTx.icon || PlusCircle,
      iconBg: newTx.iconBg || 'bg-slate-100',
      iconColor: newTx.iconColor || 'text-slate-600',
    };
    setTransactions([tx, ...transactions]);
    setActiveScreen('home');
  };

  const renderContent = () => {
    switch (activeScreen) {
      case 'home':
        return <Dashboard transactions={transactions} onAdd={() => setActiveScreen('add')} />;
      case 'stats':
        return <Stats />;
      case 'add':
        return <AddExpense onSave={handleSaveExpense} onBack={() => setActiveScreen('home')} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-slate-400">
            <Wallet size={64} className="opacity-20 mb-4" />
            <p className="font-bold text-lg">Screen coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-40">
      {/* Top Header - Hidden on certain screens if needed */}
      {activeScreen !== 'add' && (
        <header className="flex justify-between items-center px-6 h-20 sticky top-0 z-50 bg-surface/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 ring-2 ring-indigo-50/50 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-lg font-bold text-indigo-600 tracking-tight">September 2023</h1>
          </div>
          <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-colors shadow-sm">
            <Calendar size={20} />
          </button>
        </header>
      )}

      <main className="px-5 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {activeScreen !== 'add' && (
        <Navbar active={activeScreen} onChange={setActiveScreen} />
      )}
    </div>
  );
}

