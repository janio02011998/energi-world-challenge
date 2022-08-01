import { useState } from 'react';
import { ethers } from "ethers";
import { MdContentCopy } from 'react-icons/md';
import { BiLinkExternal } from 'react-icons/bi';

import { formatCurrency } from '../utils/formatCurrency';

import { IWallet } from '../interface/Wallet';
import FooxIcon from '../assets/metamask.svg';

export default function Wallet() {
  const [data, setData] = useState<IWallet>({
    address: "",
    Balance: null,
  });

  function handleConnect() {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res: Array<string>) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  }


  const getBalance = (address: string) => {

    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"]
      })
      .then((balance: ethers.BigNumberish) => {
        setData({
          address: address,
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  const accountChangeHandler = (account: string) => {
    setData({
      address: account,
    });

    getBalance(account);
  };

  return (
    <div>
      <main className="flex items-center justify-center mt-20">
        {data.Balance ? (
          <div className="w-[900px] h-[450px] flex flex-col itens-center bg-wallet p-4 rounded">
            <div className="flex justify-between border-b-2 border-gray-700 pb-2">
              <span className="font-semibold flex gap-2">
                <img
                  src={'https://app.energiswap.exchange/favicon.png'}
                  alt="metamask icon"
                  className="w-[24px] h-[24px] mr-2" />
                {data.Balance}
                Energi Network
              </span>
              <span className="flex items-center">
                Connected
                <div className="bg-green-500 w-4 h-4 rounded-full ml-2" />
              </span>
            </div>

            <div className="flex justify-between mt-4">
              <span className="flex">
                <img src={FooxIcon} alt="metamask icon" className="w-[24px] h-[24px] mr-2" />
                {data.address}
              </span>
              <div className="flex gap-2">
                <MdContentCopy size={28}
                  onClick={() => { navigator.clipboard.writeText(data.address) }}
                  style={{ cursor: "pointer" }}
                />
                <BiLinkExternal size={28} />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-20">
              <span className="text-gray-700 text-2xl whitespace-nowrap mb-4" >
                Total Balance
              </span>
              <span className="text-3xl whitespace-nowrap flex" >
                <img
                  src={'https://app.energiswap.exchange/favicon.png'}
                  alt="metamask icon"
                  className="w-[36px] h-[36px] mr-2" />
                {data.Balance}
              </span>
              <span className="text-3xl whitespace-nowrap" >
                {formatCurrency(Number(data.Balance))}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center ">
            <img src={FooxIcon} alt="metamask icon" className="w-[200px] h-[220px]" />

            <span className="text-4xl font-medium tracking-[0.5rem] mb-8">
              METAMASK
            </span>

            <button
              className="bg-green-500 rounded-md h-8 p-4 flex items-center"
              type='button'
              onClick={handleConnect}>
              Connect wallet
            </button>
          </div>
        )}
      </main>
    </div>
  )
}