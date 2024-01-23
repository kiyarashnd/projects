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
  const [messages, setMessages] = useState({});
  const [firstDir, setFirstDir] = useState(localStorage.getItem('direction'));
  const [firstLang, setFirstLang] = useState(localStorage.getItem('lang'));

  useEffect(() => {
    setFirstDir(localStorage.getItem('direction'));
    setFirstLang(localStorage.getItem('lang'));
    import(`@/lang/${firstLang}.json`).then((messages) => {
      setMessages(messages);
    });
  }, [firstLang]);

  const body = document.body;
  body?.setAttribute('dir', `${firstDir}`);

  return (
    <DirectionProvider dir={dir}>
      <IntlProvider
        locale={`${firstLang}`}
        defaultLocale='en'
        key={firstLang}
        messages={messages}
      >
        <Theme appearance='dark'>
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
