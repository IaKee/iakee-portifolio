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

  var ptbr = <>Português { <img src={'https://flagcdn.com/w20/br.png'} alt='BR' className="ml-auto"/> }</>
  var en = <>English { <img src={'https://flagcdn.com/w20/us.png'} alt='US' className="ml-auto"/> }</>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {locale === 'en' ? en : ptbr}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick = {() => changeLocale('ptbr')}>
          {ptbr}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => changeLocale('en')}>
          {en}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
