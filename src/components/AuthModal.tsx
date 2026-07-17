import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Loader2 } from "lucide-react";
import { CountryDropdown } from "./CountryDropdown";
import { useNavigate } from "react-router-dom";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "CH",
  });

  const navigate = useNavigate();

  const handleClose = () => {
    if (loading) return;
    onClose();
    setTimeout(() => {
      setMode("login");
      setError("");
      setSuccess("");
      setFormData({ name: "", email: "", phone: "", country: "CH" });
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (mode === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        const data = await res.json();
        
        if (res.ok) {
          localStorage.setItem("sessionToken", data.token);
          navigate("/dashboard");
        } else {
          setError(data.message || data.error || "An unexpected failure occurred.");
        }
      } else {
        const parts = formData.name.trim().split(" ");
        const firstName = parts[0];
        const lastName = parts.slice(1).join(" ");
        
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            firstName,
            lastName,
            phone: formData.phone,
            countryName: formData.country,
          }),
        });
        
        const data = await res.json();
        
        if (res.ok) {
          if (data.message && data.message.includes("already contacted us")) {
             setSuccess(data.message);
             setTimeout(() => {
               localStorage.setItem("sessionToken", data.token);
               navigate("/dashboard");
             }, 3000);
          } else {
             localStorage.setItem("sessionToken", data.token);
             navigate("/dashboard");
          }
        } else {
          setError(data.message || data.error || "An unexpected failure occurred.");
        }
      }
    } catch (err) {
      setError("An unexpected failure occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass w-full max-w-md overflow-hidden rounded-3xl p-8 pointer-events-auto shadow-2xl border border-border"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl tracking-tight">
                  {mode === "login" ? "Investor Login" : "Create Account"}
                </h2>
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-border"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {error && (
                <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 rounded-lg bg-primary/10 p-4 text-sm text-primary border border-primary/20">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Full Name</label>
                    <input
                      required
                      type="text"
                      disabled={loading}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className={inputBase}
                      placeholder="John Doe"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Email Address</label>
                  <input
                    required
                    type="email"
                    disabled={loading}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={inputBase}
                    placeholder="john@example.com"
                  />
                </div>

                {mode === "signup" && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Country</label>
                        <CountryDropdown 
                          value={formData.country} 
                          onChange={(v) => setFormData({ ...formData, country: v })}
                          variant="default"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Phone Number</label>
                        <input
                          required
                          type="tel"
                          disabled={loading}
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className={inputBase}
                          placeholder="079 123 45 67"
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "login" ? "Login Securely" : "Submit Details"}
                  {!loading && <ArrowUpRight className="h-4 w-4" />}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {mode === "login" ? (
                  <p>Don't have an account? <button type="button" onClick={() => setMode("signup")} className="text-primary hover:underline">Apply here</button></p>
                ) : (
                  <p>Already an investor? <button type="button" onClick={() => setMode("login")} className="text-primary hover:underline">Login here</button></p>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
