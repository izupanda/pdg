import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.css';

const DescriptionGenerator = () => {
  const [productName, setProductName] = useState('');
  const [marketplace, setMarketplace] = useState({
    'メルカリ': false,
    'ジモティ': false,
    'ヤフオク': false
  });
  const [condition, setCondition] = useState('');
  
  const router = useRouter();

  const handleChange = (market) => {
    setMarketplace(prevState => ({
      ...prevState,
      [market]: !prevState[market]
    }));
  };

  const generateDescription = async () => {
    try {

      const res = await axios.post('${process.env.API_URL}/generate-description', { 
        productName, 
        marketplace, 
        condition 
      });


      console.log('res.data:', res.data);
      console.log('typeof res.data:', typeof res.data);
      console.log('productName:', productName);
      console.log('marketplace:', marketplace);
      console.log('condition:', condition);

      router.push({
        pathname: '/descriptionresult',
        query: { 
          data: JSON.stringify({
            itemTitle: res.data.itemTitle,
            description: res.data.description
          }), 
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='container'>
      <div className="logo">
        <img src='assets/logo.svg' alt='Logo' />
      </div>
      <div className='input-container'>
        <span className='expla-title'>出品したい商品名をここに入力してください</span>
        <input placeholder='商品の名前' value={productName} onChange={e => setProductName(e.target.value)} />

        <span className='expla-title'>商品の状態を選んでください</span>
        <div className='select-wrap'>
          <select value={condition} onChange={e => setCondition(e.target.value)}>
            <option value="">状態</option>
            <option value="新品・未使用">新品・未使用</option>
            <option value="未使用に近い">未使用に近い</option>
            <option value="目立った傷や汚れなし">目立った傷や汚れなし</option>
            <option value="やや傷や汚れあり">やや傷や汚れあり</option>
            <option value="傷や汚れあり">傷や汚れあり</option>
            <option value="全体的に状態が悪い">全体的に状態が悪い</option>
          </select>
        </div>
        
        <span className='expla-title'>出品先を選んでください。</span>
        <div className='checkbox-container'>
          <label className='checkbox-label'>
            <input
              type="checkbox"
              checked={marketplace['メルカリ']}
              onChange={() => handleChange('メルカリ')}
            />
            <span>メルカリ</span>
          </label>

          <label className='checkbox-label'>
            <input
              type="checkbox"
              checked={marketplace['ジモティ']}
              onChange={() => handleChange('ジモティ')}
            />
            <span>ジモティ</span>
          </label>

          <label className='checkbox-label'>
            <input
              type="checkbox"
              checked={marketplace['ヤフオク']}
              onChange={() => handleChange('ヤフオク')}
            />
            <span>ヤフオク</span>
          </label>
        </div>


        </div>
      <button onClick={generateDescription}>商品説明文をつくる</button>
      <footer>
        <span>@copyright Handa Panda</span>
      </footer>
    </div>
  )
}

export default DescriptionGenerator;

