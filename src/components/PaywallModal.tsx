import React, { useState } from 'react';
import { X, Sparkles, Check, CreditCard, Zap, Shield } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, onActivate }) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const GUMROAD_PRODUCT_ID = 'gwY6ara8I5xgeof0CdXesQ==';
  const GUMROAD_PRODUCT_URL = 'https://blazeclip.gumroad.com/l/ucbljd';

  const handlePurchase = () => {
    // Open Gumroad checkout in a new tab
    window.open(
      GUMROAD_PRODUCT_URL,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleActivate = async () => {
    const key = licenseKey.trim();
    if (key.length < 8) return;

    setIsProcessing(true);
    try {
      // Verify license key via serverless proxy (avoids CORS)
      const res = await fetch('/api/verify-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ license_key: key }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('snapframe_license', key);
        setShowSuccess(true);
        setTimeout(() => {
          onActivate();
          onClose();
          setShowSuccess(false);
        }, 2000);
      } else {
        alert('Invalid license key. Please check and try again.');
      }
    } catch {
      alert('Could not verify license. Please check your connection and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-[#12122a] ring-1 ring-white/10 overflow-hidden animate-fade-in-up">
        {/* Gradient top bar */}
        <div className="h-1 bg-gradient-to-r from-brand-500 via-pink-500 to-brand-500 animate-gradient" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-white/40" />
        </button>

        {showSuccess ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">You're all set!</h2>
            <p className="text-white/50">Watermark removed. Enjoy SnapFrame Pro!</p>
          </div>
        ) : (
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-medium mb-4">
                <Sparkles className="w-3 h-3" />
                LIFETIME ACCESS
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Upgrade to SnapFrame Pro
              </h2>
              <p className="text-white/50 text-sm">
                Remove the watermark and unlock all future features
              </p>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="inline-flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">$9</span>
                <span className="text-2xl font-bold text-white">.99</span>
              </div>
              <p className="text-xs text-white/30 mt-1">One-time payment • Yours forever</p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {[
                { icon: <Zap className="w-4 h-4 text-amber-400" />, text: 'Clean exports — no watermark' },
                { icon: <Shield className="w-4 h-4 text-green-400" />, text: 'All future updates included' },
                { icon: <CreditCard className="w-4 h-4 text-pink-400" />, text: '30-day money-back guarantee' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                  {feature.icon}
                  {feature.text}
                </div>
              ))}
            </div>

            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl font-bold text-white text-base
                bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600
                transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Buy Now — $9.99
                </>
              )}
            </button>

            {/* License key */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-white/30 mb-2">Already have a license key?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter license key..."
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white text-sm
                    placeholder:text-white/20 ring-1 ring-white/10 focus:ring-brand-500/50
                    outline-none transition-all"
                />
                <button
                  onClick={handleActivate}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white/70 text-sm font-medium
                    hover:bg-white/15 transition-all"
                >
                  Activate
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-white/20 mt-4">
              Secure payment via Gumroad
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaywallModal;
