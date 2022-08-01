import { useState } from 'react';
import { IoMdWallet, IoMdHome } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import { BsSunFill } from 'react-icons/bs';
import classNames from 'classnames';


export function Header() {
  const location = useLocation();
  const route = location.pathname;

  const [focus, setFocus] = useState(route?.replace("/", "" || 'home'));

  const handleFocus = (route: string) => setFocus(route);

  return (
    <div className='flex items-center justify-center'>
      <Link to="/home" onClick={() => handleFocus('home')} className={classNames(
        'flex items-center justify-center p-4', {
        'border-b-4 border-green-400 ': focus === 'home'
      }
      )}>
        <IoMdHome size={32} style={{ marginRight: 6 }} />
        Home
      </Link>
      <Link to="/wallet" onClick={() => handleFocus('wallet')} className={classNames(
        'flex items-center justify-center p-4', {
        'border-b-4 border-green-400 ': focus === 'wallet'
      }
      )}>
        <IoMdWallet size={32} style={{ marginRight: 6 }} />
        Wallet
      </Link>

      <BsSunFill
        size={24}
        style={{ position: 'absolute', top: 16, right: 16, cursor: 'pointer' }}
      />
    </div>
  )
}