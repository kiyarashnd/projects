'use client';

import { ReactNode, useEffect, useInsertionEffect, useState } from 'react';
import { DirectionProvider } from '@radix-ui/react-direction';
import { useAppSelector } from '../hooks/useRedux';
import { IntlProvider } from 'react-intl';
import Navbar from '@/components/Navbar';
import { Theme } from '@radix-ui/themes';

export default function ClientApp(props: { children: ReactNode }) {
  const { lang } = useAppSelector((state) => state.uiConfig);
  const [messages, setMessages] = useState({});
  const dir = localStorage.getItem('direction');
  //   console.log('first dir is : ', firstDir);

  useEffect(() => {
    import(`@/lang/${lang}.json`).then((messages) => {
      setMessages(messages);
    });
  }, [lang, dir]);

  return (
    <DirectionProvider dir={dir}>
      <IntlProvider
        locale={lang}
        defaultLocale='en'
        key={lang}
        messages={messages}
      >
        <Theme>
          <Navbar />
          {props.children}
        </Theme>
      </IntlProvider>
    </DirectionProvider>
  );
}
