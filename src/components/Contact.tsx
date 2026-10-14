import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-14 sm:py-24 lg:py-32 bg-[#FBFBFD] border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div>
              <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#86868B] block mb-2 sm:mb-3">
                05 // GET IN TOUCH
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1D1D1F] tracking-[-0.035em] leading-tight">
                Let's start a conversation.
              </h2>
            </div>

            <p className="text-[15px] sm:text-[16px] text-[#424245] leading-relaxed">
              I'm always interested in discussing software engineering, data science projects, exploratory research, and collaborative student initiatives.
            </p>

            {/* Email Copy Card (responsive flex for small screens) */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-black/[0.07] shadow-xs space-y-2.5 sm:space-y-3">
              <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#86868B]">
                Direct Contact
              </span>
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5">
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="text-[14px] sm:text-[15px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors break-all xs:break-normal truncate"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-1.5 text-[12px] font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#EAEAEA] border border-black/[0.06] rounded-full transition-all duration-200 active:scale-95 shrink-0 min-h-[38px] cursor-pointer"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#6E6E73]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social profiles */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#86868B]">
                Public Code &amp; Network
              </span>
              <div className="flex flex-col space-y-2">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 min-h-[48px] rounded-2xl bg-[#FFFFFF] border border-black/[0.06] hover:border-black/[0.14] text-[#1D1D1F] transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <GithubIcon className="w-4 h-4 text-[#424245]" />
                    <span className="text-[13.5px] sm:text-[14px] font-medium">GitHub Repository</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#86868B] group-hover:text-[#1D1D1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 min-h-[48px] rounded-2xl bg-[#FFFFFF] border border-black/[0.06] hover:border-black/[0.14] text-[#1D1D1F] transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <LinkedinIcon className="w-4 h-4 text-[#0071E3]" />
                    <span className="text-[13.5px] sm:text-[14px] font-medium">LinkedIn Network</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#86868B] group-hover:text-[#1D1D1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-black/[0.07] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_4px_32px_rgba(0,0,0,0.02)]">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight mb-2">
                Send a Message
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#6E6E73] mb-5 sm:mb-6">
                Direct inquiry form. Please enter your email and note below.
              </p>

              {submitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F5F7] border border-black/[0.06] text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-[16px] sm:text-[17px] font-semibold text-[#1D1D1F]">Message Sent</h4>
                  <p className="text-[13.5px] sm:text-[14px] text-[#555558] max-w-sm mx-auto leading-relaxed break-words">
                    Thank you for reaching out. A copy of your inquiry has been acknowledged. You can also contact me directly via{' '}
                    <span className="font-mono text-[#1D1D1F] underline break-all">{PORTFOLIO_DATA.personal.email}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[13px] text-[#0071E3] font-medium hover:underline pt-3 inline-block cursor-pointer min-h-[44px]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[13px] font-medium text-[#1D1D1F] block">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-black/[0.1] bg-[#FAFAFA] text-[#1D1D1F] text-[14px] placeholder-[#86868B] focus:bg-[#FFFFFF] focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all outline-none min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[13px] font-medium text-[#1D1D1F] block">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-black/[0.1] bg-[#FAFAFA] text-[#1D1D1F] text-[14px] placeholder-[#86868B] focus:bg-[#FFFFFF] focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all outline-none min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[13px] font-medium text-[#1D1D1F] block">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write your note, idea, or inquiry here..."
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-black/[0.1] bg-[#FAFAFA] text-[#1D1D1F] text-[14px] placeholder-[#86868B] focus:bg-[#FFFFFF] focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-6 min-h-[46px] bg-[#1D1D1F] text-white text-[14px] font-medium rounded-full hover:bg-black transition-all active:scale-[0.99] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
