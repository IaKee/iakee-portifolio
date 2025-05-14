'use client';

import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/language-content';

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const changeLocale = (newLanguage: 'en' | 'ptbr') => {
    Cookies.set('locale', newLanguage);
    setLocale(newLanguage);
  };

  var ptbr = 
    <>
      Português 
      {
        <img 
          src={'https://flagcdn.com/w20/br.png'} 
          alt='BR' 
          className="ml-auto"/> 
      }
    </>
  var en = 
    <>
      English 
      { 
        <img 
          src={'https://flagcdn.com/w20/us.png'} 
          alt='US' 
          className="ml-auto"/> 
      }
    </>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className="
            flex 
            items-center 
            rounded-full 
            gap-2 
            border-2
            border-primary
            hover:bg-primary/32
            hover:scale-[1.05]
            cursor-pointer
            transition-all">
          
          {locale === 'en' ? en : ptbr}
        </Button>
      </DropdownMenuTrigger>

      {/* dropdown menu content */}
      <DropdownMenuContent 
        align="end"
        className="bg-primary-foreground rounded-xl">
        
        {/* portuguese button */}
        <DropdownMenuItem 
          onClick = {() => changeLocale('ptbr')}
          className="flex items-center justify-between rounded-xl">
          {ptbr}
        </DropdownMenuItem>
        
        {/* english button */}
        <DropdownMenuItem 
          onClick={() => changeLocale('en')}
          className="flex items-center justify-between rounded-xl">
          {en}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
