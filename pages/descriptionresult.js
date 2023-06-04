import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import '../styles/globals.css';

const DescriptionResult = () => {
  const router = useRouter();
  const { data } = router.query;

  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const goToDescriptionGenerator = () => {
    router.push('/descriptiongenerator');
  };

  useEffect(() => {
    if (router.isReady) {
      const parsedData = JSON.parse(decodeURIComponent(data));
      setItemTitle(parsedData.itemTitle);
      setItemDescription(parsedData.description);
    }
  }, [router.isReady, data]);

  const goBack = () => {
    router.back();
  };

  return (
    <div className='container'>
      <header>
        <div className="logo">
          <img src='assets/logo.svg' alt='Logo' />
        </div>
      </header>
      <main>
        <div className='content-container'> 
          <div className='content-title-container'>
          <h2>商品名</h2>
          <CopyToClipboard text={itemTitle}>
            <button className='ss-button'><FontAwesomeIcon icon={faCopy} className='icon-button'/> コピー</button>
          </CopyToClipboard>
          </div>
          <p>{itemTitle}</p>
        </div>
        <div className='content-container'> 
          <div className='content-title-container'>
            <h2>商品説明</h2>
            <CopyToClipboard text={itemDescription}>
              <button className='ss-button'><FontAwesomeIcon icon={faCopy} className='icon-button'/> コピー</button>
            </CopyToClipboard>
            </div>
            <p>{itemDescription}</p>
        </div>
        <span>
          <button className='small-button' onClick={goToDescriptionGenerator}>もう一度つくる</button>
        </span>
      </main>  
      <footer>
        <span>@copyright Handa Panda</span>
      </footer>
    </div>   
  );
}

export default DescriptionResult;