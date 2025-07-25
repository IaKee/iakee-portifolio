'use client'

import { useLanguage } from "@/context/language-content"
import { Users, Eye, CalendarDays, Calendar, BarChart3 } from "lucide-react"
import useSWR from 'swr';
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SiteStatsWidget() {
  const { t } = useLanguage();

  const [clickCount, setClickCount] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(
    () => {
      if (showAdvanced) {
        const timer = setTimeout(
          () => {
            setShowAdvanced(false)
            setClickCount(0)
          }, 
          1500000) // hides advanced stats after 15 seconds - TODO: remove 00

        return () => clearTimeout(timer)
      }
    }, 
    [showAdvanced]
  )
  
  const handleClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 10) {
        setShowAdvanced(true);
      }
      return newCount;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const { data, error } = useSWR<{
    total: number,
    week: number,
    month: number,
    year: number,
    online: number
  }>(
    '/api/views',
    fetcher,
    { refreshInterval: 10000 }
  );

  if (error) {
    console.error('Failed to fetch view count', error);
    return <span>{t('footer.error.fetching')}</span>
  }

  const stats = data || {
    total: 0,
    week: 0,
    month: 0,
    year: 0,
    online: 0,
  };

  return (
    <div 
      onClick={handleClick}
      className="
        flex 
        flex-wrap 
        items-center 
        gap-4 
        text-muted-foreground 
        text-sm  
        select-none">
      
      {/* active users - last 15 minutes */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Users className="w-4 h-4" />
          { // pulse circle indicator for online users
            stats.online > 0 &&
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          }
        </div>
        
        <span className="font-medium">
          {
            stats.online 
              ? `${formatNumber(stats.online)} ${showAdvanced ? t('footer.advanced.online') :t('footer.activeUsers')}` 
              : t('footer.loadingViews')
          }
        </span>
      </div>

      {/* vertical separator */}
      <div className="w-px h-4 bg-muted-foreground/30" />

      {/* lifetime views */}
      <div className="flex items-center gap-1">
        <Eye className="w-4 h-4" />
        <span className="font-medium">
          {
            stats.total 
              ? `${formatNumber(stats.total)} ${showAdvanced ? t('footer.advanced.total') :t('footer.totalUsers')}` 
              : t('footer.loadingViews')
          }
        </span>
      </div>

      {/* show advanced stats if unlocked */}
      {
        showAdvanced && (
        <>
          <div className="w-px h-4 bg-muted-foreground/30" />

          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span className="font-medium">
              {formatNumber(stats.week)}
              &nbsp; 
              {t('footer.advanced.week')}
            </span>
          </div>

          <div className="w-px h-4 bg-muted-foreground/30" />

          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">
              {formatNumber(stats.month)} 
              &nbsp; 
              {t('footer.advanced.month')}
            </span>
          </div>

          <div className="w-px h-4 bg-muted-foreground/30" />

          <div className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4" />
            <span className="font-medium">
              {formatNumber(stats.year)} 
              &nbsp; 
              {t('footer.advanced.year')}
              </span>
          </div>
        </>
      )}
    </div>
  );
}
