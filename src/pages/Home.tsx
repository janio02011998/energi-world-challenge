import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';

import { ICryptoCurrency } from '../interface/Home';
import { formatCurrency } from '../utils/formatCurrency';
import { COINS } from '../constants/endpoints';

export default function Home() {
  const [data, setData] = useState<ICryptoCurrency[]>();

  async function fetchDate() {
    const { data } = await axios.get(COINS);

    const dataValid = Object.keys(data)
      .map(key => (data[key]))
      .sort((a, b) => (a.current_price - b.current_price))
      .reverse();

    setData(dataValid);
  }


  useEffect(() => {
    fetchDate();
  }, []);


  return (
    <div>
      {data ? (
        <main className="flex items-center justify-center mt-20 ">
          <div className=" rounded border border-gray-700 ">
            <table className="h-full w-[900px] divide-y divide-gray-700 rounded">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium tracking-wider">
                    #</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider">
                    Coin</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium tracking-wider">
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium tracking-wider">
                    Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center  px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="text-center  px-6 py-4 whitespace-nowrap flex ">
                      <span className="flex">
                        <img src={item?.image} className="h-[32px] w-[32px] mr-4" />
                        {item.name}
                      </span>

                    </td>
                    <td className="text-center uppercase px-6 py-4 whitespace-nowrap">{item.symbol}</td>
                    <td className="text-center  px-6 py-4 whitespace-nowrap">{formatCurrency(item.current_price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      ) : (
        <div className="flex items-center justify-center w-[100vw] h-[90vh]">
          <ReactLoading type={'spin'} color={'#ffffff'} height={32} width={32} />
        </div>
      )}
    </div>
  )
}