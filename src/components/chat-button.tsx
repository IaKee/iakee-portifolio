"use client"

import { MessageCircle } from "lucide-react"

export function ChatButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5551995989452"
    const message = "Olá! Vim pelo seu site."

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="right-6 bottom-6 z-50 fixed flex justify-center items-center bg-green-500 hover:bg-green-600 shadow-lg p-4 rounded-full text-white hover:scale-110 transition-all duration-300">
      <MessageCircle size={28} />
    </button>
  )
}
