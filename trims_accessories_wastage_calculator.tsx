import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Layers, 
  Table, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Search, 
  Filter, 
  Sparkles, 
  Info, 
  Zap, 
  Scissors,
  Sun,
  Moon,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

const TRIMS_DATASET = [
  { id: 1, item: 'Care Label', category: 'Sewing Trims', type: 'Countable', rates: [5, 5, 4, 3, 3] },
  { id: 2, item: 'Woven Label-Main/size', category: 'Sewing Trims', type: 'Countable', rates: [5, 5, 4, 3, 3] },
  { id: 3, item: 'Batch code label', category: 'Sewing Trims', type: 'Countable', rates: [5, 5, 4, 3, 3] },
  { id: 4, item: 'Badge/tab', category: 'Sewing Trims', type: 'Countable', rates: [5, 5, 4, 3, 3] },
  { id: 5, item: 'Zipper', category: 'Sewing Trims', type: 'Countable', rates: [6, 5, 5, 4, 3] },
  { id: 6, item: 'Button', category: 'Sewing Trims', type: 'Countable', rates: [6, 5, 5, 5, 4] },
  { id: 7, item: 'Snap Button', category: 'Sewing Trims', type: 'Countable', rates: [6, 5, 5, 5, 4] },
  { id: 8, item: 'Eyelet', category: 'Sewing Trims', type: 'Countable', rates: [6, 5, 5, 5, 4] },
  { id: 9, item: 'Satin Bow / flower', category: 'Sewing Trims', type: 'Countable', rates: [8, 7, 6, 5, 4] },
  { id: 10, item: 'Heat seal label', category: 'Sewing Trims', type: 'Countable', rates: [8, 6, 5, 4, 3] },
  { id: 11, item: 'GG Tape/ Tape/ D. cord', category: 'Sewing Trims', type: 'Consumption', rates: [10, 8, 7, 6, 5] },
  { id: 12, item: 'Elastic', category: 'Sewing Trims', type: 'Consumption', rates: [8, 6, 6, 5, 4] },
  { id: 13, item: 'Lace', category: 'Sewing Trims', type: 'Consumption', rates: [10, 8, 7, 6, 5] },
  { id: 14, item: 'Sewing Thread', category: 'Sewing Trims', type: 'Consumption', rates: [10, 8, 7, 6, 5] },
  { id: 15, item: 'Sewing Thread- Garment Dye', category: 'Sewing Trims', type: 'Consumption', rates: [18, 15, 13, 11, 9] },
  { id: 16, item: 'Tissue/ paper', category: 'Finishing Trims', type: 'Consumption', rates: [5, 4, 4, 3, 2] },
  { id: 17, item: 'Hang tag', category: 'Finishing Trims', type: 'Countable', rates: [2, 2, 1, 1, 1] },
  { id: 18, item: 'String', category: 'Finishing Trims', type: 'Countable', rates: [4, 4, 4, 3, 2] },
  { id: 19, item: 'Barcode sticker', category: 'Finishing Trims', type: 'Countable', rates: [3, 2, 2, 2, 1] },
  { id: 20, item: 'Poly sticker', category: 'Finishing Trims', type: 'Countable', rates: [3, 2, 2, 2, 1] },
  { id: 21, item: 'Individual Polybag', category: 'Finishing Trims', type: 'Countable', rates: [3, 2, 2, 2, 1] },
  { id: 22, item: 'Blister Polybag', category: 'Finishing Trims', type: 'Countable', rates: [3, 2, 2, 2, 1] },
  { id: 23, item: 'Back Board', category: 'Finishing Trims', type: 'Countable', rates: [3, 2, 2, 2, 1] },
  { id: 24, item: 'PVC Poly', category: 'Finishing Trims', type: 'Countable', rates: [2, 2, 1, 1, 1] },
  { id: 25, item: 'Photo Inlay', category: 'Finishing Trims', type: 'Countable', rates: [3, 2, 2, 2, 1] },
  { id: 26, item: 'Hanger', category: 'Finishing Trims', type: 'Countable', rates: [2, 1, 1, 1, 0.5] },
  { id: 27, item: 'Hanger (Broken type- LH35, PH54, PH55 etc.)', category: 'Finishing Trims', type: 'Countable', rates: [5, 5, 4, 4, 3] },
  { id: 28, item: 'Hanger-Sizer', category: 'Finishing Trims', type: 'Countable', rates: [2, 1, 1, 1, 0.5] },
  { id: 29, item: 'Carton', category: 'Packing Trims', type: 'Countable(CTN)', rates: [6.7, 3.4, 2.7, 2.0, 1] },
  { id: 30, item: 'Top/BTM/Rizer', category: 'Packing Trims', type: 'Countable(CTN)', rates: [6.7, 3.4, 2.7, 2.0, 1] },
  { id: 31, item: 'Carton sticker', category: 'Packing Trims', type: 'Countable(CTN)', rates: [6.7, 3.4, 2.7, 2.0, 1] },
];

const QUANTITY_TIERS = [
  { index: 0, label: '≤ 1,000', min: 0, max: 1000, desc: 'Below & 1000 pcs' },
  { index: 1, label: '1,001 - 2,000', min: 1001, max: 2000, desc: '1001 to 2000 pcs' },
  { index: 2, label: '2,001 - 5,000', min: 2001, max: 5000, desc: '2001 to 5000 pcs' },
  { index: 3, label: '5,001 - 9,999', min: 5001, max: 9999, desc: '5001 to 9999 pcs' },
  { index: 4, label: '≥ 10,000', min: 10000, max: Infinity, desc: '10000+ pcs' },
];

const getTierIndex = (qty) => {
  const q = Number(qty) || 0;
  if (q <= 0) return -1;
  if (q <= 1000) return 0;
  if (q <= 2000) return 1;
  if (q <= 5000) return 2;
  if (q <= 9999) return 3;
  return 4;
};

const getWastageRate = (item, qty) => {
  const tier = getTierIndex(qty);
  if (tier === -1) return 0;
  return item.rates[tier];
};

export default function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [activeTab, setActiveTab] = useState('single'); // 'single', 'multi', 'matrix'
  const [toastMessage, setToastMessage] = useState(null);

  // Single Style State
  const [singleQty, setSingleQty] = useState('2500');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [consumptions, setConsumptions] = useState({});

  // Multi Style State
  const [multiStyles, setMultiStyles] = useState([
    { id: 1, name: 'Style A - Basic T-Shirt', qty: 1500 },
    { id: 2, name: 'Style B - Heavy Jacket', qty: 6500 }
  ]);
  const [newStyleName, setNewStyleName] = useState('');
  const [newStyleQty, setNewStyleQty] = useState('');
  const [selectedMultiTrims, setSelectedMultiTrims] = useState([1, 2, 5, 6, 14, 17, 21, 29]);

  const isDark = theme === 'dark';

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const currentTierIndex = useMemo(() => getTierIndex(singleQty), [singleQty]);

  const handleConsumptionChange = (id, val) => {
    setConsumptions(prev => ({
      ...prev,
      [id]: parseFloat(val) || 1
    }));
  };

  const filteredSingleItems = useMemo(() => {
    return TRIMS_DATASET.filter(item => {
      const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  const singleCalculatedData = useMemo(() => {
    const qty = Math.max(0, parseInt(singleQty, 10) || 0);
    return filteredSingleItems.map(item => {
      const unitRatio = consumptions[item.id] !== undefined ? consumptions[item.id] : 1;
      const baseReq = qty * unitRatio;
      const wastePercent = getWastageRate(item, qty);
      const extraWaste = Math.ceil(baseReq * (wastePercent / 100));
      const finalQty = Math.ceil(baseReq + extraWaste);
      return {
        ...item,
        unitRatio,
        baseReq,
        wastePercent,
        extraWaste,
        finalQty
      };
    });
  }, [singleQty, filteredSingleItems, consumptions]);

  const safeCopyToClipboard = async (text, successMessage) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast(successMessage);
        return;
      }
    } catch (err) {
      // Fallback
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        showToast(successMessage);
      } else {
        showToast('Copying failed. Please copy manually.');
      }
    } catch (err) {
      showToast('Clipboard access denied by browser permissions.');
    }
  };

  const handleCopyPercentages = () => {
    if (!singleQty || singleQty <= 0) {
      showToast('Please enter a valid garment quantity');
      return;
    }
    const lines = singleCalculatedData.map(item => `${item.item}: ${item.wastePercent}%`);
    const text = `--- TRIMS WASTAGE PERCENTAGES (Garment Qty: ${singleQty}) ---\n` + lines.join('\n');
    safeCopyToClipboard(text, 'Copied all wastage percentages!');
  };

  const handleCopyFinalQuantities = () => {
    if (!singleQty || singleQty <= 0) {
      showToast('Please enter a valid garment quantity');
      return;
    }
    const lines = singleCalculatedData.map(item => `${item.item}: ${item.finalQty.toLocaleString()} pcs (${item.wastePercent}% wastage)`);
    const text = `--- FINAL TRIMS QUANTITIES (Garment Qty: ${singleQty}) ---\n` + lines.join('\n');
    safeCopyToClipboard(text, 'Copied all final quantities!');
  };

  const handleCopyExcelTable = () => {
    if (!singleQty || singleQty <= 0) {
      showToast('Please enter a valid garment quantity');
      return;
    }
    const headers = ['Item Name', 'Category', 'Type', 'Unit Ratio', 'Base Req', 'Wastage %', 'Extra Wastage', 'Final Order Qty'].join('\t');
    const rows = singleCalculatedData.map(item => [
      item.item,
      item.category,
      item.type,
      item.unitRatio,
      item.baseReq,
      `${item.wastePercent}%`,
      item.extraWaste,
      item.finalQty
    ].join('\t'));

    const text = [headers, ...rows].join('\n');
    safeCopyToClipboard(text, 'Copied table format for Excel/Sheets!');
  };

  const handleCopySummary = () => {
    const totalBase = singleCalculatedData.reduce((acc, curr) => acc + curr.baseReq, 0);
    const totalFinal = singleCalculatedData.reduce((acc, curr) => acc + curr.finalQty, 0);
    const totalExtra = totalFinal - totalBase;
    const avgWaste = totalBase > 0 ? ((totalExtra / totalBase) * 100).toFixed(2) : '0';

    const text = `📋 TRIMS & ACCESSORIES WASTAGE SUMMARY\n` +
      `Garment Quantity: ${Number(singleQty).toLocaleString()} pcs\n` +
      `Active Tier: ${currentTierIndex >= 0 ? QUANTITY_TIERS[currentTierIndex].label : 'N/A'}\n` +
      `Total Base Trims: ${totalBase.toLocaleString()} units\n` +
      `Total Extra Wastage: +${totalExtra.toLocaleString()} units (${avgWaste}% avg)\n` +
      `Total Final Order Qty: ${totalFinal.toLocaleString()} units`;
    safeCopyToClipboard(text, 'Summary copied to clipboard!');
  };

  const handleAddMultiStyle = (e) => {
    e.preventDefault();
    if (newStyleName.trim() && newStyleQty > 0) {
      setMultiStyles([
        ...multiStyles,
        { id: Date.now(), name: newStyleName.trim(), qty: parseInt(newStyleQty, 10) }
      ]);
      setNewStyleName('');
      setNewStyleQty('');
    }
  };

  const handleRemoveMultiStyle = (id) => {
    setMultiStyles(multiStyles.filter(s => s.id !== id));
  };

  const toggleMultiTrim = (id) => {
    setSelectedMultiTrims(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAllMultiTrims = () => {
    if (selectedMultiTrims.length === TRIMS_DATASET.length) {
      setSelectedMultiTrims([]);
    } else {
      setSelectedMultiTrims(TRIMS_DATASET.map(t => t.id));
    }
  };

  return (
    <div className={`min-h-screen font-sans relative transition-colors duration-300 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 ${
      isDark ? 'bg-[#090D16] text-slate-100' : 'bg-slate-100 text-slate-800'
    }`}>
      
      {/* Background Ambient Glow Blobs */}
      <div className={`fixed -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-all duration-300 ${
        isDark ? 'bg-indigo-600/20' : 'bg-indigo-400/25'
      }`} />
      <div className={`fixed top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-300 ${
        isDark ? 'bg-purple-600/15' : 'bg-purple-300/30'
      }`} />
      <div className={`fixed -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-300 ${
        isDark ? 'bg-cyan-500/15' : 'bg-cyan-400/20'
      }`} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-xl border ${
            isDark 
              ? 'bg-slate-900/90 border-cyan-500/50 text-cyan-200' 
              : 'bg-white/90 border-cyan-600/40 text-cyan-900 shadow-cyan-900/10'
          }`}>
            <Check className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <header className={`sticky top-0 z-40 backdrop-blur-2xl border-b transition-colors duration-300 ${
        isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-white/70 border-slate-200/80 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between py-4 gap-4">
            
            {/* Branding Title */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-[1px] shadow-lg shadow-indigo-500/20 flex-shrink-0">
                <div className={`w-full h-full rounded-[11px] flex items-center justify-center transition-colors ${
                  isDark ? 'bg-slate-950' : 'bg-white'
                }`}>
                  <Scissors className="w-5 h-5 text-cyan-500" />
                </div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Trims & Accessories Wastage Calculator
                </h1>
                <p className={`text-xs font-medium flex items-center gap-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Sparkles className="w-3 h-3 text-cyan-500" /> Automated Tier Percentage & Quantity Allocation Matrix
                </p>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all duration-300 shadow-md ${
                  isDark
                    ? 'bg-slate-900 border-slate-700/80 text-amber-300 hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-indigo-700 hover:bg-slate-50'
                }`}
                title="Toggle Theme"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="hidden sm:inline">Day Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span className="hidden sm:inline">Dark Mode</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Navigation Tabs Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 p-1.5 rounded-2xl backdrop-blur-xl border transition-all shadow-xl ${
          isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/80 border-slate-200/90 shadow-slate-200/60'
        }`}>
          <div className="flex items-center space-x-1 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('single')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'single'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/50'
                  : isDark 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Single Style Calculator
            </button>
            <button
              onClick={() => setActiveTab('multi')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'multi'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/50'
                  : isDark 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              Multi-Style Matrix
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'matrix'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/50'
                  : isDark 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Table className="w-4 h-4" />
              Rate Card Matrix
            </button>
          </div>

          <div className={`text-xs px-3 py-1 hidden lg:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Auto-applying tier brackets based on quantity input
          </div>
        </div>

        {/* TAB 1: SINGLE STYLE CALCULATOR */}
        {activeTab === 'single' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Input & Tier Highlighter Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Garment Qty Input */}
              <div className={`lg:col-span-4 rounded-2xl p-6 backdrop-blur-xl border shadow-2xl flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/80 border-slate-200/90 shadow-slate-200/50'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className={`block text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      Garments Order Quantity
                    </label>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                      isDark ? 'text-cyan-400 bg-cyan-950/50 border-cyan-800/50' : 'text-indigo-600 bg-indigo-50 border-indigo-200'
                    }`}>
                      pcs
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={singleQty}
                      onChange={(e) => setSingleQty(e.target.value)}
                      placeholder="Enter quantity (e.g. 2500)"
                      min="0"
                      className={`w-full border rounded-xl px-4 py-3.5 text-lg font-bold outline-none transition-all ${
                        isDark 
                          ? 'bg-slate-950/80 border-slate-700/80 text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20' 
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      }`}
                    />
                    <Zap className="w-5 h-5 text-cyan-500 absolute right-4 top-4 opacity-80 pointer-events-none" />
                  </div>
                  <p className={`text-xs mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Enter order pieces to automatically detect and apply the correct wastage tier.
                  </p>
                </div>

                {/* Quick Qty Preset Buttons */}
                <div className="mt-6">
                  <span className={`text-xs mb-2 block font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Quick Quantity Presets:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[500, 1500, 3500, 8000, 15000].map(val => (
                      <button
                        key={val}
                        onClick={() => setSingleQty(val.toString())}
                        className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
                          isDark 
                            ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/60 text-slate-300 hover:text-white' 
                            : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        {val.toLocaleString()} pcs
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Quantity Tier Indicator Bar */}
              <div className={`lg:col-span-8 rounded-2xl p-6 backdrop-blur-xl border shadow-2xl flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/80 border-slate-200/90 shadow-slate-200/50'
              }`}>
                <div>
                  <h3 className={`text-sm font-semibold mb-3 flex items-center justify-between ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    <span>Wastage Bracket Tiers Breakdown</span>
                    <span className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Highlighting active bracket
                    </span>
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {QUANTITY_TIERS.map((tier) => {
                      const isActive = currentTierIndex === tier.index;
                      return (
                        <div
                          key={tier.index}
                          className={`p-3 rounded-xl border text-center transition-all duration-300 relative overflow-hidden ${
                            isActive
                              ? isDark 
                                ? 'bg-gradient-to-b from-cyan-950/90 to-indigo-950/90 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]' 
                                : 'bg-gradient-to-b from-cyan-50 to-indigo-50 border-cyan-500 shadow-md scale-[1.02]'
                              : isDark 
                                ? 'bg-slate-950/40 border-slate-800/80 opacity-60 hover:opacity-100' 
                                : 'bg-slate-50 border-slate-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          {isActive && (
                            <span className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500" />
                          )}
                          <div className={`text-xs font-bold mb-1 ${
                            isActive 
                              ? isDark ? 'text-cyan-300' : 'text-cyan-900' 
                              : isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {tier.label}
                          </div>
                          <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {tier.desc}
                          </div>
                          {isActive && (
                            <span className={`inline-block mt-2 px-2 py-0.5 text-[9px] font-bold rounded-full border ${
                              isDark ? 'text-cyan-200 bg-cyan-900/60 border-cyan-500/40' : 'text-cyan-800 bg-cyan-100 border-cyan-300'
                            }`}>
                              ACTIVE
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Stat summary strip */}
                {singleQty > 0 && (
                  <div className={`mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs ${
                    isDark ? 'border-slate-800/60' : 'border-slate-200'
                  }`}>
                    <div>
                      <span className={`block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Filtered Items</span>
                      <span className={`font-bold text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {singleCalculatedData.length} of 31
                      </span>
                    </div>
                    <div>
                      <span className={`block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Base Req</span>
                      <span className={`font-bold text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {singleCalculatedData.reduce((acc, c) => acc + c.baseReq, 0).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className={`block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Extra Wastage</span>
                      <span className="font-bold text-amber-500 text-sm">
                        +{singleCalculatedData.reduce((acc, c) => acc + c.extraWaste, 0).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className={`block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Final Order</span>
                      <span className="font-bold text-cyan-500 text-sm">
                        {singleCalculatedData.reduce((acc, c) => acc + c.finalQty, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Filter & Action Buttons Control Bar */}
            <div className={`rounded-2xl p-4 backdrop-blur-xl border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/80 border-slate-200/90 shadow-slate-200/50'
            }`}>
              
              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className={`w-4 h-4 absolute left-3 top-3 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search trim item..."
                    className={`w-full border rounded-xl pl-9 pr-4 py-2 text-xs outline-none transition-all ${
                      isDark 
                        ? 'bg-slate-950/80 border-slate-700/60 text-slate-200 placeholder-slate-500 focus:border-cyan-500' 
                        : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-indigo-500'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className={`w-4 h-4 hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`border rounded-xl px-3 py-2 text-xs outline-none w-full sm:w-auto transition-all ${
                      isDark 
                        ? 'bg-slate-950/80 border-slate-700/60 text-slate-200 focus:border-cyan-500' 
                        : 'bg-white border-slate-300 text-slate-800 focus:border-indigo-500'
                    }`}
                  >
                    <option value="All">All Categories (31)</option>
                    <option value="Sewing Trims">Sewing Trims (15)</option>
                    <option value="Finishing Trims">Finishing Trims (13)</option>
                    <option value="Packing Trims">Packing Trims (3)</option>
                  </select>
                </div>
              </div>

              {/* Action Copy Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyPercentages}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isDark 
                      ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/60 text-slate-200' 
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  }`}
                  title="Copy all wastage percentages"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-500" />
                  Copy Wastage %
                </button>

                <button
                  onClick={handleCopyFinalQuantities}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isDark 
                      ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/60 text-slate-200' 
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  }`}
                  title="Copy calculated final order quantities"
                >
                  <Copy className="w-3.5 h-3.5 text-indigo-500" />
                  Copy Final Qty
                </button>

                <button
                  onClick={handleCopyExcelTable}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isDark 
                      ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/60 text-slate-200' 
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  }`}
                  title="Copy TSV for Excel/Google Sheets"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
                  Copy Excel Format
                </button>

                <button
                  onClick={handleCopySummary}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
                  title="Copy text summary report"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Copy Summary
                </button>
              </div>

            </div>

            {/* Main Calculation Data Table */}
            <div className={`rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/90 border-slate-200 shadow-slate-200/50'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className={`border-b text-slate-400 font-semibold uppercase tracking-wider ${
                      isDark ? 'bg-slate-950/60 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <th className="py-3.5 px-4">Item Description</th>
                      <th className="py-3.5 px-4 hidden sm:table-cell">Category</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4 text-center">Unit Ratio</th>
                      <th className="py-3.5 px-4 text-right">Base Required</th>
                      <th className="py-3.5 px-4 text-center">Wastage %</th>
                      <th className="py-3.5 px-4 text-right">Extra Wastage</th>
                      <th className="py-3.5 px-4 text-right">Final Order Qty</th>
                      <th className="py-3.5 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                    {singleCalculatedData.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="py-8 text-center text-slate-500">
                          No matching trim items found.
                        </td>
                      </tr>
                    ) : (
                      singleCalculatedData.map((row) => (
                        <tr 
                          key={row.id} 
                          className={`transition-colors ${
                            isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/80'
                          }`}
                        >
                          <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            {row.item}
                          </td>
                          <td className="py-3 px-4 hidden sm:table-cell text-slate-500">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                              row.category === 'Sewing Trims'
                                ? isDark ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/40' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                : row.category === 'Finishing Trims'
                                ? isDark ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40' : 'bg-purple-50 text-purple-700 border border-purple-200'
                                : isDark ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                            }`}>
                              {row.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                            {row.type}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={row.unitRatio}
                              onChange={(e) => handleConsumptionChange(row.id, e.target.value)}
                              className={`w-16 text-center border rounded px-1.5 py-1 font-mono font-bold text-xs outline-none transition-colors ${
                                isDark 
                                  ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-cyan-500' 
                                  : 'bg-white border-slate-300 text-slate-800 focus:border-indigo-500'
                              }`}
                            />
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-medium text-slate-700 dark:text-slate-300">
                            {row.baseReq.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-2 py-0.5 rounded-full font-bold text-xs bg-amber-500/15 text-amber-500 border border-amber-500/30">
                              +{row.wastePercent}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-amber-500 font-semibold">
                            +{row.extraWaste.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-sm text-cyan-500">
                            {row.finalQty.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => safeCopyToClipboard(
                                `${row.item}: ${row.finalQty.toLocaleString()} pcs (Base: ${row.baseReq.toLocaleString()}, Wastage: ${row.wastePercent}%)`,
                                `Copied ${row.item} details!`
                              )}
                              className={`p-1.5 rounded-lg border transition-all ${
                                isDark 
                                  ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/60 text-slate-300 hover:text-white' 
                                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-600 hover:text-slate-900'
                              }`}
                              title="Copy row values"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MULTI-STYLE MATRIX */}
        {activeTab === 'multi' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Grid: Add Style Form & Trim Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Style Entry Form */}
              <div className={`lg:col-span-5 rounded-2xl p-6 backdrop-blur-xl border shadow-2xl flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/80 border-slate-200/90 shadow-slate-200/50'
              }`}>
                <div>
                  <h3 className={`text-base font-bold mb-4 flex items-center gap-2 ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    <Plus className="w-4 h-4 text-cyan-500" /> Add Garment Style
                  </h3>
                  
                  <form onSubmit={handleAddMultiStyle} className="space-y-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Style Name / Ref
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Style #102 - Polo Shirt"
                        value={newStyleName}
                        onChange={(e) => setNewStyleName(e.target.value)}
                        className={`w-full border rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${
                          isDark 
                            ? 'bg-slate-950/80 border-slate-700/80 text-white placeholder-slate-600 focus:border-cyan-500' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Garment Order Qty (pcs)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 4500"
                        min="1"
                        value={newStyleQty}
                        onChange={(e) => setNewStyleQty(e.target.value)}
                        className={`w-full border rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none transition-all ${
                          isDark 
                            ? 'bg-slate-950/80 border-slate-700/80 text-white placeholder-slate-600 focus:border-cyan-500' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!newStyleName.trim() || !newStyleQty}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 text-white font-semibold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Style to Batch
                    </button>
                  </form>
                </div>

                {/* Added Styles List */}
                <div className="mt-6 pt-4 border-t border-slate-800/60">
                  <span className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Active Batch Styles ({multiStyles.length}):
                  </span>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {multiStyles.map((s) => (
                      <div
                        key={s.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                          isDark 
                            ? 'bg-slate-950/60 border-slate-800 text-slate-200' 
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div>
                          <span className="font-semibold block">{s.name}</span>
                          <span className="text-[11px] text-cyan-500 font-mono">
                            {s.qty.toLocaleString()} pcs ({QUANTITY_TIERS[getTierIndex(s.qty)]?.label || 'N/A'})
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveMultiStyle(s.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Remove Style"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Multi-Trim Selection Box */}
              <div className={`lg:col-span-7 rounded-2xl p-6 backdrop-blur-xl border shadow-2xl flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/80 border-slate-200/90 shadow-slate-200/50'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className={`text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        Select Specific Trims & Accessories
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Only chosen items will be calculated across multi-style order quantities
                      </p>
                    </div>
                    <button
                      onClick={toggleAllMultiTrims}
                      className="text-xs text-cyan-500 hover:underline font-semibold"
                    >
                      {selectedMultiTrims.length === TRIMS_DATASET.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-2">
                    {TRIMS_DATASET.map((trim) => {
                      const isSelected = selectedMultiTrims.includes(trim.id);
                      return (
                        <button
                          key={trim.id}
                          onClick={() => toggleMultiTrim(trim.id)}
                          className={`flex items-center gap-2.5 p-2 rounded-xl text-left border text-xs transition-all ${
                            isSelected
                              ? isDark 
                                ? 'bg-indigo-950/60 border-cyan-500/60 text-slate-100' 
                                : 'bg-indigo-50 border-cyan-500 text-slate-900 font-medium'
                              : isDark 
                                ? 'bg-slate-950/30 border-slate-800/60 text-slate-400 hover:bg-slate-800/30' 
                                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-600'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="truncate">{trim.item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={`mt-4 pt-3 border-t text-xs flex justify-between ${
                  isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <span>Selected Trims: <strong className="text-cyan-500">{selectedMultiTrims.length}</strong> / 31</span>
                  <span>Batch Styles Count: <strong className="text-indigo-500">{multiStyles.length}</strong></span>
                </div>
              </div>

            </div>

            {/* Aggregated Multi-Style Calculation Results Table */}
            <div className={`rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/90 border-slate-200 shadow-slate-200/50'
            }`}>
              <div className="p-4 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
                <h3 className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                  Batch Multi-Style Aggregated Totals
                </h3>
                <button
                  onClick={() => {
                    const selectedTrims = TRIMS_DATASET.filter(t => selectedMultiTrims.includes(t.id));
                    const rows = selectedTrims.map(t => {
                      let totalFinal = 0;
                      multiStyles.forEach(s => {
                        const rate = getWastageRate(t, s.qty);
                        const base = s.qty;
                        const final = Math.ceil(base + (base * (rate / 100)));
                        totalFinal += final;
                      });
                      return `${t.item}: ${totalFinal.toLocaleString()} pcs`;
                    });
                    safeCopyToClipboard(
                      `--- BATCH MULTI-STYLE TRIMS TOTALS ---\n` + rows.join('\n'),
                      'Copied batch trim totals!'
                    );
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-700'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-500" /> Copy Batch Quantities
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className={`border-b font-semibold uppercase tracking-wider ${
                      isDark ? 'bg-slate-950/60 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <th className="py-3.5 px-4">Selected Trim Item</th>
                      <th className="py-3.5 px-4">Category</th>
                      {multiStyles.map(s => (
                        <th key={s.id} className="py-3.5 px-4 text-right">
                          <span className="block truncate max-w-[120px]">{s.name}</span>
                          <span className="text-[10px] text-cyan-500 normal-case font-mono">{s.qty.toLocaleString()} pcs</span>
                        </th>
                      ))}
                      <th className="py-3.5 px-4 text-right font-bold text-cyan-500">Total Final Qty</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                    {selectedMultiTrims.length === 0 ? (
                      <tr>
                        <td colSpan={multiStyles.length + 3} className="py-8 text-center text-slate-500">
                          Please select at least one trim item above to view calculations.
                        </td>
                      </tr>
                    ) : (
                      TRIMS_DATASET.filter(t => selectedMultiTrims.includes(t.id)).map(trim => {
                        let totalBatchQty = 0;
                        return (
                          <tr key={trim.id} className={`transition-colors ${
                            isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/80'
                          }`}>
                            <td className={`py-3 px-4 font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                              {trim.item}
                            </td>
                            <td className="py-3 px-4 text-slate-500">
                              {trim.category}
                            </td>
                            {multiStyles.map(s => {
                              const rate = getWastageRate(trim, s.qty);
                              const base = s.qty;
                              const extra = Math.ceil(base * (rate / 100));
                              const final = base + extra;
                              totalBatchQty += final;
                              return (
                                <td key={s.id} className="py-3 px-4 text-right font-mono">
                                  <span className={`block font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                    {final.toLocaleString()}
                                  </span>
                                  <span className="text-[10px] text-amber-500">
                                    +{rate}%
                                  </span>
                                </td>
                              );
                            })}
                            <td className="py-3 px-4 text-right font-mono font-bold text-sm text-cyan-500">
                              {totalBatchQty.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: RATE CARD MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className={`rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white/90 border-slate-200 shadow-slate-200/50'
            }`}>
              <div className="p-4 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    Official Trims Wastage Rate Matrix
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Standard percentage brackets based on order size tiers
                  </p>
                </div>
                <button
                  onClick={() => {
                    const headers = ['Item Name', 'Category', 'Type', 'Below & 1000', '1001-2000', '2001-5000', '5001-9999', '10000+'].join('\t');
                    const rows = TRIMS_DATASET.map(t => [t.item, t.category, t.type, ...t.rates.map(r => `${r}%`)].join('\t'));
                    safeCopyToClipboard([headers, ...rows].join('\n'), 'Rate Card copied to clipboard!');
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-700'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-500" /> Copy Full Rate Matrix
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className={`border-b font-semibold uppercase tracking-wider ${
                      isDark ? 'bg-slate-950/60 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <th className="py-3.5 px-4">Item Name</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4 text-center">≤ 1,000</th>
                      <th className="py-3.5 px-4 text-center">1,001 - 2,000</th>
                      <th className="py-3.5 px-4 text-center">2,001 - 5,000</th>
                      <th className="py-3.5 px-4 text-center">5,001 - 9,999</th>
                      <th className="py-3.5 px-4 text-center">≥ 10,000</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                    {TRIMS_DATASET.map((trim) => (
                      <tr key={trim.id} className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/80'
                      }`}>
                        <td className={`py-3 px-4 font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                          {trim.item}
                        </td>
                        <td className="py-3 px-4 text-slate-500">{trim.category}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{trim.type}</td>
                        {trim.rates.map((rate, idx) => (
                          <td key={idx} className="py-3 px-4 text-center font-mono font-bold text-cyan-500">
                            {rate}%
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Footer Remarks Card */}
        <div className={`rounded-2xl p-5 border text-xs space-y-2 transition-all ${
          isDark ? 'bg-slate-900/50 border-slate-800/80 text-slate-400' : 'bg-white/60 border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
            <Info className="w-4 h-4 text-cyan-500" /> Official Wastage Guidelines & Remarks:
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>For PP sample, booking additional quantity in sample size (10 pcs to 20 pcs) based on buyer requirement.</li>
            <li>For any excess shipment, additional quantity must be calculated and provided accordingly.</li>
          </ul>
        </div>

      </main>

    </div>
  );
}