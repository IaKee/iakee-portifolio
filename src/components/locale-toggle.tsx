'use client';

import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/language-content';
import Image from 'next/image';

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const changeLocale = (newLanguage: 'en' | 'ptbr') => {
    Cookies.set('locale', newLanguage);
    setLocale(newLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-primary/32 px-4 py-2 border-2 border-primary rounded-full hover:scale-[1.05] transition-all cursor-pointer">
      
          <span className="flex items-center gap-2">
            {locale === 'en' ? 'English' : 'Português'}
            <Image
              src={
                locale === 'en'
                  ? 'https://flagcdn.com/w40/us.png'
                  : 'https://flagcdn.com/w40/br.png'
              }
              alt={locale === 'en' ? 'US Flag' : 'BR Flag'}
              width={24}
              height={16}
              className="rounded-sm"
              style={{ height: 'auto' }}/>
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="bg-primary-foreground rounded-xl">
        
        <DropdownMenuItem
          onClick={() => changeLocale('ptbr')}
          className="flex justify-between items-center gap-2 rounded-full">
          
          Português
          <Image
            src="https://flagcdn.com/w40/br.png"
            alt="BR Flag"
            width={24}
            height={16}
            className="rounded-sm"/>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => changeLocale('en')}
          className="flex justify-between items-center gap-2 rounded-full">
          
          English
          <Image
            src="https://flagcdn.com/w40/us.png"
            alt="US Flag"
            width={24}
            height={16}
            className="rounded-sm"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
