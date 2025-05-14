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
      className="
        fixed 
        bottom-6 
        right-6 
        bg-green-500 
        hover:bg-green-600 
        text-white 
        rounded-full 
        p-4 
        shadow-lg 
        transition-all 
        duration-300 
        hover:scale-110 
        z-50 
        flex 
        items-center 
        justify-center">
      <MessageCircle size={28} />
    </button>
  )
}
