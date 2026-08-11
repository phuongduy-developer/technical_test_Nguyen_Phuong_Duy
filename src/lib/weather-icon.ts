import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  type LucideIcon,
} from "lucide-react"

interface WeatherIconInfo {
  Icon: LucideIcon
  colorClass: string
}

const ICON_BY_CONDITION: Record<string, WeatherIconInfo> = {
  Clear: { Icon: Sun, colorClass: "text-amber-500" },
  Clouds: { Icon: Cloud, colorClass: "text-slate-400" },
  Rain: { Icon: CloudRain, colorClass: "text-blue-500" },
  Drizzle: { Icon: CloudDrizzle, colorClass: "text-blue-400" },
  Thunderstorm: { Icon: CloudLightning, colorClass: "text-purple-500" },
  Snow: { Icon: CloudSnow, colorClass: "text-sky-400" },
  Mist: { Icon: CloudFog, colorClass: "text-slate-400" },
  Smoke: { Icon: CloudFog, colorClass: "text-slate-400" },
  Haze: { Icon: CloudFog, colorClass: "text-slate-400" },
  Fog: { Icon: CloudFog, colorClass: "text-slate-400" },
}

const DEFAULT_ICON: WeatherIconInfo = { Icon: Cloud, colorClass: "text-slate-400" }

export function getWeatherIcon(condition: string): WeatherIconInfo {
  return ICON_BY_CONDITION[condition] ?? DEFAULT_ICON
}
