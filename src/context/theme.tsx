import { createContext, ReactNode, useState } from 'react';

export const ThemeContext = createContext({} as IThemesContextData);

interface IThemesContextData {
  theme: string;
}

interface IThemesProvider {
  children: ReactNode;
  theme: string;
}

export function ThemesProvider({
  children,
  theme
}: IThemesProvider) {
  const [themes, setThemes] = useState<String>('dark');


  return (
    <ThemeContext.Provider
      value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemes = createContext(ThemeContext);