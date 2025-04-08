"use client"

import Script from "next/script"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, Check, Lock } from "lucide-react"

export default function ContactProtection() {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  const handleRecaptchaVerify = () => {
    // In a real implementation, this would verify with Google's servers
    setTimeout(() => {
      setIsVerified(true)
    }, 1000)
  }

  useEffect(() => {
    // Simulate script loading
    setTimeout(() => {
      setIsLoading(false)
      setRecaptchaLoaded(true)
    }, 800)
  }, [])

  return (
    <div className="w-full">
      {!isVerified ? (
        <motion.div className="flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center gap-1 text-sm text-gray-300 mb-1">
            <Lock size={14} className="text-blue-400" />
              <span className="text-xs">
              For my contact information, please fill the reCAPTCHA. This helps protect me against spam.
              </span>
          </div>
        
          <script src="https://www.google.com/recaptcha/api.js"></script>
          {isLoading ? (
            <div className="h-[78px] w-[300px] bg-slate-800/50 rounded flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="recaptcha-container">
              <div className="g-recaptcha bg-white rounded overflow-hidden w-[300px] h-[78px] relative">
                <div className="flex items-center p-3 border-b border-gray-200">
                  <div className="w-5 h-5 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <path fill="#4285F4" d="M16 14v10h-6v-10H16z" />
                      <path fill="#34A853" d="M16 14h10v6H16v-6z" />
                      <path fill="#FBBC05" d="M16 24h10v6H16v-6z" />
                      <path fill="#EA4335" d="M10 24h6v6h-6v-6z" />
                      <path fill="#C5221F" d="M10 14v10H4V14h6z" />
                      <path fill="#1E8E3E" d="M16 8h10v6H16V8z" />
                      <path fill="#FCC934" d="M10 8h6v6h-6V8z" />
                      <path fill="#1A73E8" d="M4 8h6v6H4V8z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600">reCAPTCHA</span>
                  <span className="text-xs text-gray-400 ml-1">protected</span>
                </div>
                <div className="flex items-center p-3">
                  <div
                    className="w-5 h-5 border border-gray-300 rounded mr-2 cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={handleRecaptchaVerify}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {isVerified && <Check size={14} className="text-blue-500" />}
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">
                    I'm not a robot
                  </span>
                  
                  <div className="ml-auto">
                    <svg width="32" height="32" viewBox="0 0 24 24">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                        fill="#4285F4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          <motion.div
            className="flex items-center gap-1 text-sm text-gray-300"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}>
            <Phone size={16} className="text-blue-400" />
            <span>
              +55 51 995.989.452
            </span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1 text-sm text-gray-300"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}>
            <Mail size={16} className="text-blue-400" />
            <span>
              giordano.s.mail@gmail.com
            </span>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

