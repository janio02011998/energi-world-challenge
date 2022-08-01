import { Header } from './Header';

interface ILayout {
  children: React.ReactNode;
}

export function Layout(props: ILayout) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}