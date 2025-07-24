"use client"

import { Settings, Palette, Layout, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StyleConfig {
  colorScheme: string
  containerSize: string
  borderRadius: string
  animationSpeed: string
  shadows: string
  effectsEnabled: boolean
}

interface StyleCustomizerProps {
  styleConfig: StyleConfig
  setStyleConfig: (config: StyleConfig) => void
}

export default function StyleCustomizer({ styleConfig, setStyleConfig }: StyleCustomizerProps) {
  const updateConfig = (key: keyof StyleConfig, value: string | boolean) => {
    setStyleConfig({
      ...styleConfig,
      [key]: value,
    })
  }

  const colorSchemes = [
    { value: "default", label: "Padrão", color: "bg-slate-500" },
    { value: "ocean", label: "Oceano", color: "bg-blue-500" },
    { value: "sunset", label: "Pôr do Sol", color: "bg-orange-500" },
    { value: "forest", label: "Floresta", color: "bg-green-500" },
    { value: "purple", label: "Roxo", color: "bg-purple-500" },
  ]

  const containerSizes = [
    { value: "compact", label: "Compacto", description: "Container menor para foco" },
    { value: "default", label: "Padrão", description: "Tamanho balanceado" },
    { value: "wide", label: "Amplo", description: "Container largo para mais conteúdo" },
  ]

  const borderRadiusOptions = [
    { value: "sharp", label: "Afiado", description: "Sem bordas arredondadas" },
    { value: "default", label: "Padrão", description: "Bordas suavemente arredondadas" },
    { value: "round", label: "Arredondado", description: "Bordas bem arredondadas" },
    { value: "pill", label: "Pílula", description: "Bordas totalmente arredondadas" },
  ]

  const animationSpeeds = [
    { value: "slow", label: "Lenta", description: "Animações suaves e relaxantes" },
    { value: "default", label: "Padrão", description: "Velocidade balanceada" },
    { value: "fast", label: "Rápida", description: "Animações ágeis e responsivas" },
  ]

  const shadowOptions = [
    { value: "none", label: "Nenhuma", description: "Interface plana" },
    { value: "default", label: "Padrão", description: "Sombras equilibradas" },
    { value: "soft", label: "Suave", description: "Sombras delicadas" },
    { value: "strong", label: "Forte", description: "Sombras pronunciadas" },
  ]

  const resetToDefaults = () => {
    setStyleConfig({
      colorScheme: "default",
      containerSize: "default",
      borderRadius: "default",
      animationSpeed: "default",
      shadows: "default",
      effectsEnabled: true,
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Configurações de estilo</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Personalizar Estilos
          </SheetTitle>
          <SheetDescription>Customize a aparência e comportamento dos componentes em tempo real.</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Color Schemes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Esquema de Cores
              </CardTitle>
              <CardDescription>Escolha uma paleta de cores para a interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.value}
                    onClick={() => updateConfig("colorScheme", scheme.value)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:bg-muted/50 ${
                      styleConfig.colorScheme === scheme.value ? "border-primary bg-muted/50" : "border-transparent"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${scheme.color}`} />
                    <span className="font-medium">{scheme.label}</span>
                    {styleConfig.colorScheme === scheme.value && (
                      <Badge variant="secondary" className="ml-auto">
                        Ativo
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Layout Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Layout e Espaçamento
              </CardTitle>
              <CardDescription>Ajuste o tamanho e forma dos elementos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tamanho do Container</Label>
                <Select
                  value={styleConfig.containerSize}
                  onValueChange={(value) => updateConfig("containerSize", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {containerSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        <div>
                          <div className="font-medium">{size.label}</div>
                          <div className="text-xs text-muted-foreground">{size.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Bordas Arredondadas</Label>
                <Select value={styleConfig.borderRadius} onValueChange={(value) => updateConfig("borderRadius", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {borderRadiusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Animation & Effects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Animações e Efeitos
              </CardTitle>
              <CardDescription>Configure a velocidade e intensidade dos efeitos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Velocidade das Animações</Label>
                <Select
                  value={styleConfig.animationSpeed}
                  onValueChange={(value) => updateConfig("animationSpeed", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {animationSpeeds.map((speed) => (
                      <SelectItem key={speed.value} value={speed.value}>
                        <div>
                          <div className="font-medium">{speed.label}</div>
                          <div className="text-xs text-muted-foreground">{speed.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sombras</Label>
                <Select value={styleConfig.shadows} onValueChange={(value) => updateConfig("shadows", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {shadowOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Efeitos Especiais
                  </Label>
                  <p className="text-xs text-muted-foreground">Ativa efeitos visuais adicionais</p>
                </div>
                <Switch
                  checked={styleConfig.effectsEnabled}
                  onCheckedChange={(checked) => updateConfig("effectsEnabled", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Reset Button */}
          <Button variant="outline" onClick={resetToDefaults} className="w-full">
            Restaurar Padrões
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
