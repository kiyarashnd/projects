'use client';

import { ReactNode, useEffect, useState } from 'react';
import { DirectionProvider } from '@radix-ui/react-direction';
import { useAppSelector } from '../hooks/useRedux';
import { IntlProvider } from 'react-intl';
import Navbar from '@/components/Navbar';
import { Theme } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';

export default function ClientApp(props: { children: ReactNode }) {
  const { dir } = useAppSelector((state) => state.uiConfig);
  const lang = dir === 'ltr' ? 'en' : 'fa';
  const [messages, setMessages] = useState({});

  useEffect(() => {
    import(`@/lang/${lang}.json`).then((messages) => {
      setMessages(messages);
    });
    const body = document.body;
    body?.setAttribute('dir', `${dir}`);
  }, [lang, dir]);

  return (
    <DirectionProvider dir={dir}>
      <IntlProvider
        locale={`${lang}`}
        defaultLocale='en'
        key={lang}
        messages={messages}
      >
        {/* <Theme appearance='dark'> */}
        <Theme>
          <Navbar />
          {props.children}
          <footer className='bg-gray-400 flex justify-center py-9 mt-10'>
            <Text>footer content</Text>
          </footer>
        </Theme>
      </IntlProvider>
    </DirectionProvider>
  );
}
